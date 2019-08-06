import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';

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
  color:any = [];

  set_brand_id:String;
  set_category_id:String;
  set_color_list: any;
  
  productEditForm: FormGroup;
  design_num: String;
  detail: String;
  brand_id: String;
  category_id: String;
  price: String;
  qty_per_box: String;
  min_order: String;
  color_list: any;

  constructor(
    private router: Router, 
    private route:ActivatedRoute, 
    private data:DataService,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.product_id = this.route.snapshot.paramMap.get('id');
    //console.log(this.product_id);
    this.showProduct();
    this.showBrand();
    this.showCategory();
    this.showColors();

    this.productEditForm = new FormGroup({
      design_num: new FormControl(),
      detail: new FormControl(),
      brand_id: new FormControl(),
      category_id: new FormControl(),
      price: new FormControl(),
      qty_per_box: new FormControl(),
      min_order: new FormControl(),
      color_list: new FormControl()
    })
  }

  clickCancel(): void {
    this.router.navigate(['/product/'+this.product_id]);
  }
  
  onSubmit() {
    this.design_num = this.productEditForm.get('design_num').value;
    this.detail = this.productEditForm.get('detail').value;
    this.brand_id = this.productEditForm.get('brand_id').value;
    this.category_id = this.productEditForm.get('category_id').value;
    this.price = this.productEditForm.get('price').value;
    this.qty_per_box = this.productEditForm.get('qty_per_box').value;
    this.min_order = this.productEditForm.get('min_order').value;
    this.color_list = this.productEditForm.get('color_list').value;

    let sendData = {
      id: this.product_id,
      design_number: this.design_num,
      description: this.detail,
      brand_id: this.brand_id,
      category_id: this.category_id,
      price_per_piece: this.price,
      quantity_per_box: this.qty_per_box,
      min_order_box_quantity: this.min_order,
      number_of_color: this.color_list
    }

    //if(this.design_num == null || this.detail == null || this.brand_id == null 
    //  || this.category_id == null || this.price == null || this.qty_per_box == null 
    //  || this.min_order == null) {
    //  alert('Enter full credentials!');
    //} else {

      console.log(sendData);
      this.data.productEdit(sendData).subscribe(
        async res => {  
          if(res.status == true) {
            console.log(res);
            this.router.navigate(['/product/'+this.product_id]); 
          } else {
            const alert = await this.alertCtrl.create({
              header: 'Error!',
              message: res.message,
              buttons: ['OK']
              });
              alert.present();
          }          
      });
    //}
  }

  showProduct() {
    let sendData = {
      product_id: this.product_id
    }

    this.data.productDetails(sendData).subscribe(
      res => {
        if(res.status == true) {
          this.product = res.data;

          this.productEditForm.patchValue({
            design_num:res.data.pro_design_num,
            detail:res.data.pro_description,
            price:res.data.pro_price_per_piece,
            qty_per_box:res.data.pro_qty_per_box,
            min_order:res.data.pro_min_order_box_qty
          });

          this.set_brand_id = res.data.pro_brand_id;
          this.set_category_id = res.data.pro_cat_id;
          this.set_color_list = res.data.pro_num_of_color.split(',');

          console.log(this.product);
        } else {
          this.product = res.message;
          console.log("No response");
        }
      });
  }

  showBrand() {
    this.data.brandList().subscribe(
      res => {
        if(res.status == true) {
          this.brand = res.data;
          this.productEditForm.patchValue({
            brand_id:this.set_brand_id
          });
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
          this.productEditForm.patchValue({
            category_id:this.set_category_id
          });
          console.log(this.category);
        } else {
          this.category = res.message;
          console.log("No response");
        }
      });
  }

  showColors() {
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
  }
}
