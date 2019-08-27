import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {

  orders_fixed: any = [];
  orders: any = [];

  constructor(
    private router: Router,
    private data:DataService
  ) { }

  ngOnInit() {
    //this.showOrders();
  }

  ionViewWillEnter(){
    this.showOrders();
  }

  showOrders() {
    this.data.orderList().subscribe(
      res => {
        if(res.status == true){
          this.orders_fixed = res.data;
          this.orders = res.data;
          //console.log(this.orders);
        } else {
          console.log("No response");
        }
      });
  }

  onChange($event) {
    let status = $event.target.value;
    this.orders = [];
    
    this.orders_fixed.forEach(element => {
      if(status == -1) {
        this.orders.push(element);
      }
      else if(element.order_status == status) {
        this.orders.push(element);
      }
    });

    console.log('orders:......... ', this.orders);
  }

  moveOrderDetails(order_id) {
    this.router.navigate(['/orders/'+order_id]);
  }

}
