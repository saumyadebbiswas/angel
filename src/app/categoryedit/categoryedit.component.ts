import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-categoryedit',
  templateUrl: './categoryedit.component.html',
  styleUrls: ['./categoryedit.component.scss'],
})
export class CategoryeditComponent implements OnInit {

  category_id: string;

  category:any = [];
  brand:any = [];

  set_brand_id:String;
  
  categoryEditForm: FormGroup;
  brand_id:string;
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
    this.categoryEditForm = new FormGroup({
      brand_id: new FormControl(),
      name: new FormControl(),
      detail: new FormControl()
    });

    this.category_id = this.route.snapshot.paramMap.get('id');

    this.showCategories();
    this.showBrand();
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
    this.brand_id = this.categoryEditForm.get('brand_id').value;
    this.name = this.categoryEditForm.get('name').value;
    this.detail = this.categoryEditForm.get('detail').value;

    if(this.imageResponse[0]==null){
      this.imageResponse[0] = "";
    }

    let sendData = {
      id: this.category_id,
      brand_id: this.brand_id,
      name: this.name.trim(),
      description: this.detail.trim(),
      image_name: this.image_name,
      imagefile: this.imageResponse[0]
    }

    if(this.category_id == "" || this.category_id == null || this.brand_id == "" 
    || this.name.trim() == "" || this.detail.trim() == ""){
      alert('Enter full credentials!');
    } else {
      console.log(sendData);
      this.data.categoryEdit(sendData).subscribe(
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

  showCategories() {
    let sendData = {
      category_id: this.category_id
    }

    this.data.categoryDetails(sendData).subscribe(
      res => {
        if(res.status == true) {
          this.category = res.data;
          this.set_brand_id = res.data.cat_brand_id;
          this.image_name = res.data.cat_image_name;

          this.categoryEditForm.patchValue({
            name:res.data.cat_name,
            detail:res.data.cat_description
          });

          console.log(this.category);
        } else {
          this.category = res.message;
          console.log("No response");
        }
      });
  }

  showBrand() {
    this.data.brandList().subscribe(
      res => {
        if(res.status == true) {
          this.brand = res.data;
          this.categoryEditForm.patchValue({
            brand_id:this.set_brand_id
          });
          console.log(this.brand);
        } else {
          this.brand = res.message;
          console.log("No response");
        }
      });
  }

}
