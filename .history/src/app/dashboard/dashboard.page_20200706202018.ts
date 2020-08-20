import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  sess_staff_role: String;
  subscription:any;

  constructor(
    public menuCtrl: MenuController,
    private router: Router,
    private platform: Platform
  ) { 
    this.sess_staff_role = localStorage.getItem("sess_staff_role");

    this.menuCtrl.enable(true);
  }

  ngOnInit() {}

  ionViewWillEnter(){ 
    if(localStorage.getItem("sess_staff_name") === null || localStorage.getItem("sess_staff_name") === "") {
      this.router.navigate(['/signin']);
    }
  }

  ionViewDidEnter(){ 
    this.subscription = this.platform.backButton.subscribe(()=>{ 
      navigator['app'].exitApp(); 
    }); 
  } 

  ionViewWillLeave(){ 
    this.subscription.unsubscribe();
  }

  moveOrders() {
    this.router.navigate(['/orders']);
  }
  moveProducts() {
    this.router.navigate(['/products']);
  }
  moveBrands() {
    this.router.navigate(['/brands']);
  }
  moveCategories() {
    this.router.navigate(['/categories']);
  }
  moveStaffs() {
    this.router.navigate(['/staffs']);
  }

}
