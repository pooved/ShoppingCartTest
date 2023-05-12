import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  totalItem: number = 0;
  constructor(public cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.getProducts().subscribe({
      next: (successResponse) => {
        this.totalItem = successResponse.reduce((acc: any, cur) => {
          return (acc = acc + cur.quantity);
        }, 0);
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      },
    });
  }
}
