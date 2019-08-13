import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-addbrand',
  templateUrl: './addbrand.component.html',
  styleUrls: ['./addbrand.component.scss'],
})
export class AddbrandComponent implements OnInit {
  
  brandAddForm: FormGroup;
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
    this.brandAddForm = new FormGroup({
      name: new FormControl(),
      detail: new FormControl()
    });

    this.brandAddForm.patchValue({
      name:"",
      detail:""
    });
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
    this.name = this.brandAddForm.get('name').value.trim();
    this.detail = this.brandAddForm.get('detail').value.trim();

    if(this.imageResponse[0]==null){
      this.imageResponse[0] = "";
    }

    let sendData = {
      name: this.name,
      description: this.detail,
      imagefile: this.imageResponse[0]
    }

    if(this.name == "" || this.detail == "" || this.imageResponse[0] == ""){
      alert('Enter full credentials!');
    } else {
      console.log(sendData);
      this.data.brandAdd(sendData).subscribe(
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

}
