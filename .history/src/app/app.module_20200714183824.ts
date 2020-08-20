import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
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
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent, 
    SigninComponent, 
    BrandsComponent,
    CategoriesComponent,
    ProductsComponent,
    AddbrandComponent,
    AddcategoryComponent,
    AddproductsComponent,
    ProductdetailsComponent,
    ProducteditComponent,
    EditprofileComponent,
    BrandeditComponent,
    CategoryeditComponent,
    StaffsComponent,
    StaffeditComponent,
    AddstaffComponent,
    OrdersComponent,
    OrderdetailsComponent,
    ResetPasswordComponent,
    cus
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    NgbModule, 
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TagInputModule,
    BrowserAnimationsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    DatePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
