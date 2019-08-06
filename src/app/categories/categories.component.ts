import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  categories: any = [];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.showCatergories();
  }  

  showCatergories() {
    this.data.categoryList().subscribe(
      res => {
        if(res.status == true){
          this.categories = res.data;
          console.log(this.categories);
        } else {
          console.log("No response");
        }
      });
  }

}
