import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  sess_staff_role: String;

  constructor(private router: Router) { 
    this.sess_staff_role = localStorage.getItem("sess_staff_role");
  }

  ngOnInit() {
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
