import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})
export class ProductdetailsComponent implements OnInit {

  product_id: string;
  product:any = [];

  constructor(private route:ActivatedRoute, private data:DataService) { }

  ngOnInit() {
    this.product_id = this.route.snapshot.paramMap.get('id');
    //console.log(this.product_id);
    this.showProduct();
  }

  showProduct() {
    let sendData = {
      product_id: this.product_id
    }

    this.data.productDetails(sendData).subscribe(
      res => {
        if(res.status == true) {
          this.product = res.data;
          console.log(this.product);
        } else {
          this.product = res.message;
          console.log("No response");
        }
      });
  }

}
