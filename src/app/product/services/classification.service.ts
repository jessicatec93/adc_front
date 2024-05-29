import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import { Observable} from 'rxjs';
import { ClassificationResponse } from '../schemas/classification-response';

@Injectable({
  providedIn: 'root',
})
export class ClassificationService {
  private url:string = 'https://adc-back.onrender.com/api/classifications';
  
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