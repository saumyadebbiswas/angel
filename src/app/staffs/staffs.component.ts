import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.scss'],
})
export class StaffsComponent implements OnInit {

  staffs: any = [];

  constructor(
    private router: Router,
    private data: DataService
  ) { }

  ngOnInit() {
    //this.showStaffs();
  }

  ionViewWillEnter(){
    //console.log('ion View Will Enter staff...');
    this.showStaffs();
  }

  showStaffs() {
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
