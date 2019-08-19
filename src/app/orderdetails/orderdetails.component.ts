import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss'],
})
export class OrderdetailsComponent implements OnInit {

  order_id: string;
  order_items: any = [];

  constructor(
    private data: DataService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.order_id = this.route.snapshot.paramMap.get('id');

    this.showOrderItems();
  }  

  showOrderItems() {
    let sendData = {
      order_id: this.order_id
    }

    this.data.orderItemList(sendData).subscribe(
      res => {
        if(res.status == true){
          this.order_items = res.data;
          console.log(this.order_items);
        } else {
          console.log("No response");
        }
      });
  }

}
