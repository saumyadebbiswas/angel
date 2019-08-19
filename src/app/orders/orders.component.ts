import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {

  orders: any = [];

  constructor(
    private router: Router,
    private data:DataService
  ) { }

  ngOnInit() {
    this.showOrders();
  }

  showOrders() {
    this.data.orderList().subscribe(
      res => {
        if(res.status == true){
          this.orders = res.data;
          //console.log(this.orders);
        } else {
          console.log("No response");
        }
      });
  }

  moveOrderDetails(order_id) {
    this.router.navigate(['/orders/'+order_id]);
  }

}
