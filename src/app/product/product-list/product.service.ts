import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import { Observable, map} from 'rxjs';
import { Pagination } from './schemas/Pagination';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url:string = 'http://127.0.0.1:8000/api/products';
  
  constructor(private http: HttpClient) {
  }

  getProductonOrders(text_search = ''): Observable<Pagination> {
    let url = this.url
    if (text_search){
      url = this.url + '?name=' + text_search;
    }
    return this.http.get<Pagination>(url);
  }
}