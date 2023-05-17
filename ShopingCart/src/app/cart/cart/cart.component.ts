import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { cart } from 'src/app/model/cart.model';
import { product } from 'src/app/model/product.model';
import { CartService } from 'src/app/service/cart.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartProducts: product[] = [];

  displayedColumns: string[] = [
    'name',
    'category',
    'image',
    'cost',
    'discount',
    'quantity',
    'total',
  ];
  displayedColumnsBills: string[] = [
    'name',
    'category',
    'cost',
    'discount',
    'quantity',
    'total',
  ];

  grandTotal: number = 0;
  discountAmount: number = 0;
  finalTotal: number = 0;
  deliveryCharges: number = 0;
  dataSource: MatTableDataSource<product> = new MatTableDataSource<product>();
  dateTime: Date = new Date();
  independenceDate: Date = new Date('08/15/2023');
  baseUrl = '  http://localhost:3000';
  constructor(
    public cartService: CartService,
    private serviceAPI: ServiceService
  ) {}
  ngOnInit(): void {
    this.cartService.getProducts().subscribe({
      next: (successResponse) => {
        this.cartProducts = successResponse;

        this.dataSource = new MatTableDataSource<product>(this.cartProducts);
        this.discountAmount = this.cartService.discountAmount();
        this.grandTotal = this.cartService.getTotalPrice();
        this.deliveryCharges = this.cartService.deliveryCharges();
        this.finalTotal = this.cartService.getFinalTotal();
        this.cartProducts.forEach((item) => {
          Object.assign(item, {
            dates: new Date(),
          });
          this.serviceAPI.onCart(item).subscribe({
            next: (successresponse) => {
              console.log(`pp:${successresponse}`);
            },
          });
        });
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      },
    });

    console.log(`pp:${this.cartProducts}`);
  }
  onProductDelete(product: product) {
    this.cartService.removeCartItem(product);
  }
  onModelChanged(product: product) {
    this.cartService.onModelChanged(product);
  }
  onCartEmpty() {
    this.cartService.removeAll();
  }
}
