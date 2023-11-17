import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import { Observable, map} from 'rxjs';
import { Pagination } from './order-list/schemas/Pagination';
import { OrderCreateResponse } from './order-list/schemas/order-create-response';
import { OrderDetailResponse } from './order-detail/schemas/order-detail-response';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url:string = 'http://127.0.0.1:8000/api/orders';
  
  constructor(private http: HttpClient) {
  }

  getOrders(params = ''): Observable<Pagination> {
    let url = this.url
    if (params){
      url = this.url + params;
    }
    return this.http.get<Pagination>(url);
  }
  
  getOneOrder(order_id: number): Observable<OrderDetailResponse> {
    const url = this.url + '/' + order_id;
    return this.http.get<OrderDetailResponse>(url);
  }

  deleteOrder(order_id: number): Observable<OrderCreateResponse> {
    const url = this.url + '/' + order_id;
    return this.http.delete<OrderCreateResponse>(url);
  }
}