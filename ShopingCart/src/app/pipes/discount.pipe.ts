import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  transform(value: any, arg: any, arg1: any): any {
    if (value) {
      const total = arg + arg1;
      const discount = (total / 100) * value;
      const totalPrice = value - discount;
      return totalPrice;
    } else {
      return null;
    }
  }
}
