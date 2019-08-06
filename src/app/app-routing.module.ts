import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { AddbrandComponent } from './addbrand/addbrand.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ProducteditComponent } from './productedit/productedit.component';
import { BrandeditComponent } from './brandedit/brandedit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'signin', component: SigninComponent },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'brands', component: BrandsComponent },
  { path: 'brand/edit/:id', component: BrandeditComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'add-brand', component: AddbrandComponent },
  { path: 'add-category', component: AddcategoryComponent },
  { path: 'add-product', component: AddproductsComponent },
  { path: 'product/:id', component: ProductdetailsComponent },
  { path: 'product/edit/:id', component: ProducteditComponent },
  { path: 'edit-profile', component: EditprofileComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
