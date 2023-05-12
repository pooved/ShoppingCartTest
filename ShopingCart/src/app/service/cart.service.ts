import { discount } from './../model/discount.model';
import { category } from './../model/category.model';
import { product } from './../model/product.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DiscountPipe } from '../pipes/discount.pipe';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private discountPipe: DiscountPipe) {}
  cartItemList: product[] = [];
  productList = new BehaviorSubject<product[]>([]);

  getProducts() {
    return this.productList.asObservable();
  }

  addToCart(product: product) {
    let itemAllreadyExist = false;
    this.cartItemList.forEach((item: any) => {
      if (item.id === product.id) {
        item.quantity += 1;
        itemAllreadyExist = true;
      }
    });
    if (!itemAllreadyExist) {
      this.cartItemList.push(product);
    }
    this.getTotalPerItem();
    this.getTotalPrice();
    this.productList.next(this.cartItemList);
    this.getFinalTotal();
  }
  getTotalPerItem() {
    const independenceDate: Date = new Date('08/15/2023');
    const dateTime = new Date();
    this.cartItemList.map((product: any) => {
      let total = Number(product.cost) * Number(product.quantity);
      if (
        dateTime.setHours(0, 0, 0, 0) !== independenceDate.setHours(0, 0, 0, 0)
      ) {
        product.total = this.discountPipe.transform(
          total,
          product.discount.normalDiscount,
          0
        );
      } else {
        product.total = this.discountPipe.transform(
          total,
          product.discount.normalDiscount,
          product.discount.additionalIndepenceDiscount
        );
      }

      console.log(total);
    });
  }
  getTotalPrice(): number {
    let total = 0;
    this.cartItemList.map(
      (product: any) => (total = Number(total + product.total))
    );
    console.log(this.cartItemList);
    return total;
  }
  discountAmount() {
    let discountAmount: number = 0;
    let total = 0;
    this.cartItemList.map((product: any) => {
      if (this.getTotalPrice() >= 25000) {
        discountAmount = (this.getTotalPrice() * 10) / 100;
      }
    });
    return discountAmount;
  }
  getFinalTotal(): number {
    let finalTotal: number = 0;
    finalTotal =
      Number(this.getTotalPrice()) +
      Number(this.deliveryCharges()) -
      Number(this.discountAmount());

    return finalTotal;
  }
  onModelChanged(product: product) {
    this.cartItemList.map((a: any, index: any) => {
      if (a.id === product.id) {
        if (a.quantity == 0) {
          this.cartItemList.splice(index, 1);
        }
      }
      this.getTotalPerItem();
    });
    this.productList.next(this.cartItemList);
  }
  removeCartItem(product: product) {
    this.cartItemList.map((a: product, index: any) => {
      this.cartItemList.splice(index, 1);
    });
    this.productList.next(this.cartItemList);
  }
  removeAll() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
  deliveryCharges() {
    let newArr: product[] = [];
    this.cartItemList.forEach((item) => {
      if (
        newArr.some(
          (el) => el.category.deliverCharges === item.category.deliverCharges
        ) === false
      ) {
        newArr.push(item);
      }
    });
    let totalDeliveryCharge: number = 0;

    newArr.map((product) => {
      totalDeliveryCharge += Number(product.category.deliverCharges);
    });

    return totalDeliveryCharge;
  }
}
