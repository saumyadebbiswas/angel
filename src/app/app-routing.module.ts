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
import { CategoryeditComponent } from './categoryedit/categoryedit.component';
import { StaffsComponent } from './staffs/staffs.component';
import { StaffeditComponent } from './staffedit/staffedit.component';
import { AddstaffComponent } from './addstaff/addstaff.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';

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
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule) },
  { path: 'brands', component: BrandsComponent },
  { path: 'brand/edit/:id', component: BrandeditComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category/edit/:id', component: CategoryeditComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'add-brand', component: AddbrandComponent },
  { path: 'add-category', component: AddcategoryComponent },
  { path: 'add-product', component: AddproductsComponent },
  // { path: 'product/:id', component: ProductdetailsComponent },
  { path: 'products/:id', component: ProductdetailsComponent },
  { path: 'product/edit/:id', component: ProducteditComponent },
  { path: 'staffs', component: StaffsComponent },
  { path: 'staff/edit/:id', component: StaffeditComponent },
  { path: 'add-staff', component: AddstaffComponent },
  { path: 'edit-profile', component: EditprofileComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/:id', component: OrderdetailsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
