import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-productedit',
  templateUrl: './productedit.component.html',
  styleUrls: ['./productedit.component.scss'],
})
export class ProducteditComponent implements OnInit {

  product_id: string;
  product:any = [];
  brand:any = [];
  category:any = [];
  allimages:any = [];

  //color:any = [];
  //set_color_list: any;
  
  productEditForm: FormGroup;
  name:String;
  design_num: String;
  detail: String;
  brand_id: String;
  category_id: String;
  price: String;
  qty_per_box: String;
  min_order: String;
  color_list: any;
  image_name: String;

  new_category:any = [];

  imageResponse:any = [];
  imageResponseAll:any = [];

  constructor(
    private router: Router, 
    private route:ActivatedRoute, 
    private data:DataService,
    public alertCtrl: AlertController,
    private imagePicker: ImagePicker
  ) { }

  ngOnInit() {
    this.product_id = this.route.snapshot.paramMap.get('id');

    this.productEditForm = new FormGroup({
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
  }

  clickCancel(): void {
    this.router.navigate(['/products/'+this.product_id]);
  }
  
  onSubmit() {
    this.name = this.productEditForm.get('name').value.trim();
    this.design_num = this.productEditForm.get('design_num').value.trim();
    this.detail = this.productEditForm.get('detail').value.trim();
    this.brand_id = this.productEditForm.get('brand_id').value;
    this.category_id = this.productEditForm.get('category_id').value;
    this.price = this.productEditForm.get('price').value.trim();
    this.qty_per_box = this.productEditForm.get('qty_per_box').value.trim();
    this.min_order = this.productEditForm.get('min_order').value.trim();
    this.color_list = this.productEditForm.get('color_list').value;

    if(this.imageResponse[0]==null){
      this.imageResponse[0] = "";
    }

    if(this.product_id == null || this.product_id == "" || this.name == "" || 
    this.design_num == "" || this.detail == "" || this.brand_id == null || 
    this.category_id == null || this.price == "" || this.qty_per_box == "" || 
    this.min_order == "" || this.color_list == "" || this.color_list == null) {
      alert('Enter full credentials!');
    } else {
      console.log('color_list before........', this.color_list);
      this.color_list = this.tagArrayToString(this.color_list);

      console.log('color_list after........', this.color_list);

      let sendData = {
        id: this.product_id,
        name: this.name,
        design_number: this.design_num,
        description: this.detail,
        brand_id: this.brand_id,
        category_id: this.category_id,
        price_per_piece: this.price,
        quantity_per_box: this.qty_per_box,
        min_order_box_quantity: this.min_order,
        number_of_color: this.color_list,
        image_name: this.image_name,
        imagefile: this.imageResponse[0],
        imagefileall: this.imageResponseAll,
        allimages: this.allimages
      }

      console.log(sendData);
      this.data.productEdit(sendData).subscribe(
        async res => {  
          if(res.status == true) {
            console.log(res);
            // this.router.navigate(['/products/'+this.product_id]); 
            this.router.navigateByUrl('/products/'+this.product_id); 
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

  showProduct() {
    let sendData = {
      product_id: this.product_id
    }

    this.data.productDetails(sendData).subscribe(
      res => {
        if(res.status == true) {
          //console.log('edit data : ..........', res);
          this.product = res.data;

          let num_of_color = res.data.pro_num_of_color.split(',');
          let newarray = [];
          for(let i=0; i<num_of_color.length; i++) {
            newarray[i] = {display: num_of_color[i], value: num_of_color[i]};
          }

          this.productEditForm.patchValue({
            name:res.data.pro_name,
            design_num:res.data.pro_design_num,
            detail:res.data.pro_description,
            price:res.data.pro_price_per_piece,
            qty_per_box:res.data.pro_qty_per_box,
            min_order:res.data.pro_min_order_box_qty,
            color_list:newarray,
            category_id:res.data.pro_cat_id,
            brand_id:res.data.pro_brand_id
          });

          //this.set_color_list = res.data.pro_num_of_color.split(',');
          this.image_name = res.data.pro_image_name;

          let productimages = res.data.productimages;
          productimages.forEach(element => {
            this.allimages.push(element);
            this.imageResponseAll.push(element.proimg_image_name);
          });
        } else {
          //this.product = res.message;
          console.log("No response");
        }
      });
  }

  showBrand() {
    this.data.brandList().subscribe(
      res => {
        if(res.status == true) {
          this.brand = res.data;
          //console.log(this.brand);
        } else {
          //this.brand = res.message;
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
          //console.log(this.category);
          this.showProduct();
        } else {
          //this.category = res.message;
          console.log("No response");
        }
      });
  }

  /*showColors() {
    this.data.colorList().subscribe(
      res => {
        if(res.status == true) {
          this.color = res.data;
          this.productEditForm.patchValue({
            color_list:this.set_color_list
          });
          console.log(this.color);
        } else {
          this.color = res.message;
          console.log("No response");
        }
      });
  }*/

  onChange($event) {
    console.log('on change called', $event.target.value);
    console.log('all cat list/................', this.category);
    
    
    let brand_id = $event.target.value;
    this.new_category = [];
    
    // let j = 0;
    // for(let i=0; i<this.category.length; i++){
    //   if(this.category[i].cat_brand_id == brand_id){
    //     this.new_category[j] = this.category[i];
    //     j++;
    //   }
    // }

    this.category.forEach(elem => {
      if(elem.cat_brand_id == $event.target.value){
        this.new_category.push(elem);
      }
    });
  
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

  getAllImages(index) {
    let options = {
      maximumImagesCount: 1,
      width: 200,
      quality: 25,
      outputType: 1
    };

    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imageResponseAll[index] = 'data:image/jpeg;base64,' + results[i];
      }
    }, (err) => {
      alert(err);
    });
  }

}
