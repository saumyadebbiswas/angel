import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {

  constructor() { }

  ngOnInit() {}



  ionViewWillEnter(){
    //console.log('ion View Will Enter staff...');
    this.showStaffs();
  }







  showCusto() {
    this.data.staffList().subscribe(
      res => {
        if(res.status == true){
          this.staffs = res.data;
          //console.log(this.staffs);
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
