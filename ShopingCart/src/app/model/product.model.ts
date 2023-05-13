import { discount } from './discount.model';
import { category } from './category.model';
export interface product {
  id: 'number';
  name: 'string';
  category: category;
  image: 'string';
  cost: 'number';
  discount: discount;
  quantity: 'number';
  total: 'number';
  dates: 'date';
}
