import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss'],
})
export class AddcategoryComponent implements OnInit {

  brand:any = [];
  
  categoryAddForm: FormGroup;
  brand_id:string;
  name: String;
  detail: String;
  image_name: String;

  imageResponse:any = [];

  constructor(
    private router: Router, 
    private data:DataService,
    public alertCtrl: AlertController,
    private imagePicker: ImagePicker
    ) { }

  ngOnInit() {
    this.categoryAddForm = new FormGroup({
      brand_id: new FormControl(),
      name: new FormControl(),
      detail: new FormControl()
    });

    this.showBrand();

    this.categoryAddForm.patchValue({
      name:"",
      detail:""
    });
  }

  clickCancel() {
    this.router.navigate(['/categories']);
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

  onSubmit() {
    this.brand_id = this.categoryAddForm.get('brand_id').value;
    this.name = this.categoryAddForm.get('name').value.trim();
    this.detail = this.categoryAddForm.get('detail').value.trim();

    if(this.imageResponse[0]==null){
      this.imageResponse[0] = "";
    }

    let sendData = {
      brand_id: this.brand_id,
      name: this.name,
      description: this.detail,
      imagefile: this.imageResponse[0]
    }

    if(this.brand_id == null || this.name == "" || this.detail == "" || 
    this.imageResponse[0] == ""){
      alert('Enter full credentials!');
    } else {
      console.log(sendData);
      this.data.categoryAdd(sendData).subscribe(
        async res => {  
          if(res.status == true) {
            console.log(res);
            this.router.navigate(['/categories']); 
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
    this.data.brandList().subscribe(
      res => {
        if(res.status == true) {
          this.brand = res.data;
          console.log(this.brand);
        } else {
          this.brand = res.message;
          console.log("No response");
        }
      });
  }

}
