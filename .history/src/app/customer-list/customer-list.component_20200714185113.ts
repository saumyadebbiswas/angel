import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  customers: any;

  constructor(
    private router: Router,
    private data: DataService
  ) { }

  ngOnInit() {}



  ionViewWillEnter(){
    //console.log('ion View Will Enter staff...');
    this.showCustomers();
  }







  showCustomers() {
    this.data.customerList().subscribe(
      res => {
        if(res.status == true){
          this.customers = res.data;
          console.log(this.staffs);
        } else {
          console.log("No response");
        }
      });
  }

  moveStaffAdd() {
    this.router.navigate(['/add-staff']);
  }
  moveStaffEdit(staff_id) {
    this.router.navigate(['/staff/edit/'+staff_id]);
  }

}
