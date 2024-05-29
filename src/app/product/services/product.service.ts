import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import { Observable} from 'rxjs';
import { Pagination } from '../product-list/schemas/pagination';
import { ProductDetailResponse } from '../product-detail/schemas/product-detail-response';
import { ProductCreate } from '../product-create/schemas/product-create';
import { ProductCreateResponse } from '../product-create/schemas/product-create-response';
import { ProductResumResponse } from './productResumResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url:string = 'https://adc-back.onrender.com/api/products';
  
  constructor(private http: HttpClient) {
  }

  getProducts(params: string = ''): Observable<Pagination> {
    let url = this.url
    if (params){
      url = this.url + params;
    }
    return this.http.get<Pagination>(url);
  }

  getProductsResum(params: string = ''): Observable<ProductResumResponse> {
    let url = this.url
    if (params){
      url = this.url + '-list' + params;
    }
    return this.http.get<ProductResumResponse>(url);
  }


  getOneProducts(product_id: number): Observable<ProductDetailResponse> {
    const url = this.url + '/' + product_id;
    return this.http.get<ProductDetailResponse>(url);
  }

  createProduct(data: ProductCreate): Observable<ProductCreateResponse> {
    return this.http.post<ProductCreateResponse>(this.url, data);
  }

  updateProduct(product_id: number, data: ProductCreate): Observable<ProductCreateResponse> {
    const url = this.url + '/' + product_id;
    return this.http.put<ProductCreateResponse>(url, data);
  }

  deleteProduct(product_id: number): Observable<ProductCreateResponse> {
    const url = this.url + '/' + product_id;
    return this.http.delete<ProductCreateResponse>(url);
  }
}