import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  requestHeader: any = new HttpHeaders();

  constructor(private http:HttpClient) {
    //this.requestHeader.append("Accept", 'application/json');
    this.requestHeader.append('Content-Type', 'application/json');
  }

  login(input:any): Observable<any> {
    return this.http.post<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/authentication/login', input, {headers: this.requestHeader})
  }

  brandList(): Observable<any> {
    return this.http.get<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/brand/details', {headers: this.requestHeader})
  }

  brandDetails(input:any): Observable<any> {
    return this.http.get<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/brand/details/'+input.brand_id, {headers: this.requestHeader})
  }

  brandEdit(input:any): Observable<any> {
    return this.http.put<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/brand/edit', input, {headers: this.requestHeader})
  }

  brandAdd(input:any): Observable<any> {
    return this.http.post<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/brand/insert', input, {headers: this.requestHeader})
  }

  categoryList(): Observable<any> {
    return this.http.get<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/category/details', {headers: this.requestHeader})
  }

  categoryDetails(input:any): Observable<any> {
    return this.http.get<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/category/details/'+input.category_id, {headers: this.requestHeader})
  }

  categoryEdit(input:any): Observable<any> {
    return this.http.put<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/category/edit', input, {headers: this.requestHeader})
  }

  categoryAdd(input:any): Observable<any> {
    return this.http.post<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/category/insert', input, {headers: this.requestHeader})
  }

  productList(): Observable<any> {
    return this.http.get<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/product/all-details', {headers: this.requestHeader})
  }

  productDetails(input:any): Observable<any> {
    return this.http.get<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/product/details/'+input.product_id, {headers: this.requestHeader})
  }

  productEdit(input:any): Observable<any> {
    return this.http.put<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/product/edit', input, {headers: this.requestHeader})
  }

  productAdd(input:any): Observable<any> {
    return this.http.post<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/product/insert', input, {headers: this.requestHeader})
  }

  productDelete(product_id:any): Observable<any> {
    return this.http.delete<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/product/delete/'+product_id, {headers: this.requestHeader})
  }

  colorList(): Observable<any> {
    return this.http.get<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/color/details', {headers: this.requestHeader})
  }

  staffList(): Observable<any> {
    return this.http.get<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/authentication/allstaffs', {headers: this.requestHeader})
  }

  staffDetails(input:any): Observable<any> {
    return this.http.get<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/authentication/staff/'+input.staff_id, {headers: this.requestHeader})
  }

  staffEdit(input:any): Observable<any> {
    return this.http.put<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/authentication/staff-edit', input, {headers: this.requestHeader})
  }

  staffAdd(input:any): Observable<any> {
    return this.http.post<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/authentication/staff-insert', input, {headers: this.requestHeader})
  }

  orderList(): Observable<any> {
    return this.http.get<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/orders/all-details', {headers: this.requestHeader})
  }

  orderItemList(input:any): Observable<any> {
    return this.http.get<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/orders/all-items/'+input.order_id, {headers: this.requestHeader})
  }

  orderStatusUpdate(input:any): Observable<any> {
    return this.http.put<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/orders/status-update', input, {headers: this.requestHeader})
  }

  profileEdit(input:any): Observable<any> {
    return this.http.put<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/authentication/edit', input, {headers: this.requestHeader})
  }

  resetPassword(input:any): Observable<any> {
    return this.http.put<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/authentication/reset-password', input, {headers: this.requestHeader})
  }
}
