import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})
export class ProductdetailsComponent implements OnInit {

  product_id: string;
  product:any = [];

  constructor(
    private router: Router, 
    private route:ActivatedRoute, 
    private data:DataService
  ) { }

  ngOnInit() {
    //console.log("im called.............");
    
    // this.product_id = this.route.snapshot.paramMap.get('id');
    // console.log(this.product_id);
    // this.showProduct();
  }

  ionViewWillEnter(){
    console.log('ion View Will Enter');
    
    this.product_id = this.route.snapshot.paramMap.get('id');
    console.log(this.product_id);
    this.showProduct();
  }

  showProduct() {
    console.log('show product called.........: ');
    let sendData = {
      product_id: this.product_id
    }

    this.data.productDetails(sendData).subscribe(
      res => {
        if(res.status == true) {
          this.product = res.data;
          // console.log('show product called.........: ', this.product);
        } else {
          this.product = res.message;
          console.log("No response");
        }
      });
  }
  
  moveProductEdit(product_id) {
    this.router.navigate(['/product/edit/'+product_id]);
  }

}
