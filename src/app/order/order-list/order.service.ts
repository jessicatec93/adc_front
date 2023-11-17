import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import { Observable, map} from 'rxjs';
import { Pagination } from './schemas/Pagination';
import { OrderCreateResponse } from './schemas/order-create-response';

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

  deleteOrder(order_id: number): Observable<OrderCreateResponse> {
    const url = this.url + '/' + order_id;
    return this.http.delete<OrderCreateResponse>(url);
  }
}