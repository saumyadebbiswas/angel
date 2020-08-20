import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  id: any;
  customers: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController,
    private router: Router,
    private data: DataService
  ) { 
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
  }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    //console.log('ion View Will Enter staff...');
    this.showCustomersdetails(this.id);
  }







  showCustomersdetails(id) {
    this.data.customerList().subscribe(
      res => {
        if(res.status == true){
          this.customers = res.data;
          console.log(this.customers);
        } else {
          console.log("No response");
        }
      });
  }





}
