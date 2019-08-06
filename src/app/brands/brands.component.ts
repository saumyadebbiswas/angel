import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit {

  brands: any = [];

  constructor(private data: DataService) { }

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

}
