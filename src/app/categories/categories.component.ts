import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  categories: any = [];

  constructor(
    private router: Router,
    private data: DataService
  ) { }

  ngOnInit() {
    this.showCatergories();
  }  

  showCatergories() {
    this.data.categoryList().subscribe(
      res => {
        if(res.status == true){
          this.categories = res.data;
          console.log('Alll category zzz..............', this.categories);
        } else {
          console.log("No response");
        }
      });
  }

  moveCategoryAdd() {
    this.router.navigate(['/add-category']);
  }
  moveCategoryEdit(category_id) {
    this.router.navigate(['/category/edit/'+category_id]);
  }

}
