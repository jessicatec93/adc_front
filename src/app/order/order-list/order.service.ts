import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import { Observable, map} from 'rxjs';
import { Pagination } from './schemas/Pagination';

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
}