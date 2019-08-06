import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
    BrandeditComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
