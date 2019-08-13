import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.scss'],
})
export class StaffsComponent implements OnInit {

  staffs: any = [];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.showStaffs();
  }

  showStaffs() {
    this.data.staffList().subscribe(
      res => {
        if(res.status == true){
          this.staffs = res.data;
          console.log(this.staffs);
        } else {
          console.log("No response");
        }
      });
  }

}
