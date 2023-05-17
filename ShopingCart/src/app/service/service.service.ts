import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { product } from '../model/product.model';
import { Observable } from 'rxjs/internal/Observable';
import { cart } from '../model/cart.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  baseUrl = '  http://localhost:3000';

  constructor(private httpClient: HttpClient) {}
  getProducts(): Observable<product[]> {
    return this.httpClient.get<product[]>(this.baseUrl + '/product');
  }
  getPurchaseDetails(): Observable<product[]> {
    return this.httpClient.get<product[]>(this.baseUrl + '/cart');
  }
  onCart(cartpProduct: product) {
    const addCartProduct: cart = {
      name: cartpProduct.name,
      category: cartpProduct.category.name,
      cost: cartpProduct.cost,
      quantity: cartpProduct.quantity,
      total: cartpProduct.total,
      dates: cartpProduct.dates,
    };
    console.log(addCartProduct);
    return this.httpClient.post<cart>(this.baseUrl + '/cart', addCartProduct);
  }
}
