import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import { Observable} from 'rxjs';
import { Product } from './schemas/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url:string = 'http://127.0.0.1:8000/api/products';
  
  constructor(private http: HttpClient) {
  }

  getProductonOrders(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }
}