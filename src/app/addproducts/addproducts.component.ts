import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.scss'],
})
export class AddproductsComponent implements OnInit {

  tags = ['Ionic', 'Angular', 'TypeScript'];

  brand:any = [];
  category:any = [];
  //color:any = [];
  
  productAddForm: FormGroup;
  name:String;
  design_num: String;
  detail: String;
  brand_id: String;
  category_id: String;
  price: String;
  qty_per_box: String;
  min_order: String;
  color_list: any;

  new_category:any = [];

  imageResponse:any = [];

  constructor(
    private router: Router, 
    private data:DataService,
    public alertCtrl: AlertController,
    private imagePicker: ImagePicker
  ) { }

  ngOnInit() {
    this.productAddForm = new FormGroup({
      name: new FormControl(),
      design_num: new FormControl(),
      detail: new FormControl(),
      brand_id: new FormControl(),
      category_id: new FormControl(),
      price: new FormControl(),
      qty_per_box: new FormControl(),
      min_order: new FormControl(),
      color_list: new FormControl()
    });
    
    this.showBrand();
    this.showCategory();
    //this.showColors();

    this.productAddForm.patchValue({
      name:"",
      design_num:"",
      detail:"",
      price:"",
      qty_per_box:"",
      min_order:""
    });
  }

  clickCancel(): void {
    this.router.navigate(['/products']);
  }
  
  onSubmit() {
    this.name = this.productAddForm.get('name').value.trim();
    this.design_num = this.productAddForm.get('design_num').value.trim();
    this.detail = this.productAddForm.get('detail').value.trim();
    this.brand_id = this.productAddForm.get('brand_id').value;
    this.category_id = this.productAddForm.get('category_id').value;
    this.price = this.productAddForm.get('price').value.trim();
    this.qty_per_box = this.productAddForm.get('qty_per_box').value.trim();
    this.min_order = this.productAddForm.get('min_order').value.trim();
    this.color_list = this.productAddForm.get('color_list').value;

    if(this.imageResponse[0]==null){
      this.imageResponse[0] = "";
    }

    if(this.name == "" || this.design_num == "" || this.detail == "" || 
    this.brand_id == null || this.category_id == null || this.price == "" || 
    this.qty_per_box == "" || this.min_order == "" || this.color_list == "" || 
    this.color_list == null || this.imageResponse[0] == "") {
      alert('Enter full credentials!');
    } else {
      this.color_list = this.tagArrayToString(this.color_list);

      let sendData = {
        name: this.name,
        design_number: this.design_num,
        description: this.detail,
        brand_id: this.brand_id,
        category_id: this.category_id,
        price_per_piece: this.price,
        quantity_per_box: this.qty_per_box,
        min_order_box_quantity: this.min_order,
        number_of_color: this.color_list,
        imagefile: this.imageResponse[0]
      }

      console.log(sendData);
      this.data.productAdd(sendData).subscribe(
        async res => {  
          if(res.status == true) {
            console.log(res);
            this.router.navigate(['/products']); 
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

  tagArrayToString(tagArray: string[]): string {
    if (Array.isArray(tagArray) && tagArray.length > 0) {
      const tags = tagArray.map((e: any) => `${e.value}`);
      const tagString = tags.join();
      return tagString;
    } else {
      return '';
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

  showCategory() {
    this.data.categoryList().subscribe(
      res => {
        if(res.status == true) {
          this.category = res.data;
          this.new_category = res.data;
          console.log(this.category);
        } else {
          this.category = res.message;
          console.log("No response");
        }
      });
  }

  /*showColors() {
    this.data.colorList().subscribe(
      res => {
        if(res.status == true) {
          this.color = res.data;
          console.log(this.color);
        } else {
          this.color = res.message;
          console.log("No response");
        }
      });
  }*/

  onChange($event) {
    let brand_id = $event.target.value;
    this.new_category = [];
    
    let j = 0;
    for(let i=0; i<this.category.length; i++){
      if(this.category[i].cat_brand_id == brand_id){
        this.new_category[j] = this.category[i];
        j++;
      }
    }
  
    console.log(this.new_category);
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

}
