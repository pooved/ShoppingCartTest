import { CartService } from './../../service/cart.service';
import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/model/product.model';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productList: product[] = [];
  dateTime: Date = new Date();
  independenceDate: Date = new Date('08/15/2023');
  constructor(
    private productService: ServiceService,
    public cartService: CartService
  ) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (successResponse) => {
        this.productList = successResponse;
        this.productList.forEach((product: any) => {
          Object.assign(product, { quantity: 1, total: product.cost });
        });
      },
      error: (errorResponse) => console.log(errorResponse),
    });
  }
  onAddToCart(item: product) {
    this.cartService.addToCart(item);
  }
}
