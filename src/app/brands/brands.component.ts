import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit {

  brands: any = [];

  constructor(
    private router: Router,
    private data: DataService
  ) { }

  ngOnInit() {
    this.showBrands();
  }

  showBrands() {
    this.data.brandList().subscribe(
      res => {
        if(res.status == true){
          this.brands = res.data;
          console.log(this.brands);
        } else {
          console.log("No response");
        }
      });
  }

  moveBrandEdit(brand_id) {
    this.router.navigate(['/brand/edit/'+brand_id])
  }
  moveBrandAdd() {
    this.router.navigate(['/add-brand'])
  }

}
