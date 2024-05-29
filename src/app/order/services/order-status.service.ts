import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import { Observable} from 'rxjs';
import { OrderStatusResponse } from '../schemas/order-status-response';

@Injectable({
  providedIn: 'root',
})
export class OrderStatusService {
  private url:string = 'https://adc-back.onrender.com/api/order-statuses';
  
  constructor(private http: HttpClient) {
  }

  getOrderStatuses(params: string = ''): Observable<OrderStatusResponse> {
    let url = this.url
    if (params){
      url = this.url + params;
    }
    return this.http.get<OrderStatusResponse>(url);
  }
}