import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { product } from '../model/product.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  baseUrl = '  http://localhost:3000/product';
  constructor(private httpClient: HttpClient) {}
  getProducts(): Observable<product[]> {
    return this.httpClient.get<product[]>(this.baseUrl);
  }
}
