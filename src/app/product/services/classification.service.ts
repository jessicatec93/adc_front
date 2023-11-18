import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import { Observable} from 'rxjs';
import { ClassificationResponse } from '../schemas/classification-response';

@Injectable({
  providedIn: 'root',
})
export class ClassificationService {
  private url:string = 'http://127.0.0.1:8000/api/classifications';
  
  constructor(private http: HttpClient) {
  }

  getClassifications(params: string = ''): Observable<ClassificationResponse> {
    let url = this.url
    if (params){
      url = this.url + params;
    }
    return this.http.get<ClassificationResponse>(url);
  }
}