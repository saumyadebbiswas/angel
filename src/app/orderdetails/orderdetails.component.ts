import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss'],
})
export class OrderdetailsComponent implements OnInit {

  order_id: string;
  order_items: any = [];
  order_status: string;

  constructor(
    private router: Router,
    private data: DataService,
    private route:ActivatedRoute,
    public alertCtrl: AlertController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.order_id = this.route.snapshot.paramMap.get('id');

    this.showOrderItems();
  }  

  clickBack(): void {
    this.router.navigate(['/orders']);
  }

  async showOrderItems() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    let sendData = {
      order_id: this.order_id
    }

    this.data.orderItemList(sendData).subscribe(
      res => {
        if(res.status == true){
          this.order_items = res.data;
          this.order_status = res.data[0].order_status;
          //console.log('order_items:....... ', this.order_items);
        } else {
          console.log("No response");
        }
      });
    
      this.loadingController.dismiss();
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  changeStatus(new_status) {
    let sendData = {
      order_id: this.order_id,
      order_status_new: new_status
    }
    console.log('sendData........', sendData);

    this.data.orderStatusUpdate(sendData).subscribe(
      async res => {  
        if(res.status == true) {
          //console.log(res);
          this.router.navigate(['/orders']); 
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
