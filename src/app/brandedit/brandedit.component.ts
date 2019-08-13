import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-brandedit',
  templateUrl: './brandedit.component.html',
  styleUrls: ['./brandedit.component.scss'],
})
export class BrandeditComponent implements OnInit {

  brand_id: string;
  brand:any = [];
  
  brandEditForm: FormGroup;
  name: String;
  detail: String;
  image_name: String;

  imageResponse:any = [];

  constructor(
    private router: Router, 
    private route:ActivatedRoute,
    private data:DataService,
    public alertCtrl: AlertController,
    private imagePicker: ImagePicker
  ) { }

  ngOnInit() {
    this.brand_id = this.route.snapshot.paramMap.get('id');

    this.showBrand();

    this.brandEditForm = new FormGroup({
      name: new FormControl(),
      detail: new FormControl()
    })
  }

  getImages() {
    let options = {
      maximumImagesCount: 1,
      width: 200,
      quality: 25,
      outputType: 1
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
      }
    }, (err) => {
      alert(err);
    });
  }

  clickCancel(): void {
    this.router.navigate(['/brands']);
  }

  onSubmit() {
    this.name = this.brandEditForm.get('name').value;
    this.detail = this.brandEditForm.get('detail').value;

    if(this.imageResponse[0]==null){
      this.imageResponse[0] = "";
    }

    let sendData = {
      id: this.brand_id,
      name: this.name.trim(),
      description: this.detail.trim(),
      image_name: this.image_name,
      imagefile: this.imageResponse[0]
    }

    if(this.brand_id == "" || this.brand_id == null || this.name.trim() == "" || 
    this.detail.trim() == ""){
      alert('Enter full credentials!');
    } else {
      console.log(sendData);
      this.data.brandEdit(sendData).subscribe(
        async res => {  
          if(res.status == true) {
            console.log(res);
            this.router.navigate(['/brands']); 
          } else {
            const alert = await this.alertCtrl.create({
              header: 'Error!',
              message: res.message,
              buttons: ['OK']
              });
              alert.present();
          }          
      });
    }
  }

  showBrand() {
    let sendData = {
      brand_id: this.brand_id
    }

    this.data.brandDetails(sendData).subscribe(
      res => {
        if(res.status == true) {
          this.brand = res.data;
          this.image_name = res.data.image_name;

          this.brandEditForm.patchValue({
            name:res.data.name,
            detail:res.data.description
          });

          console.log(this.brand);
        } else {
          this.brand = res.message;
          console.log("No response");
        }
      });
  }

}
