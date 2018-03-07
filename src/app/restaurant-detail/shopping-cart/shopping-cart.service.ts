import { Injectable } from '@angular/core';
import { CartItem } from './cart-item.model';
import { MenuItem } from '../menu-item/menu-item.model';

@Injectable()
export class ShoppingCartService {

  public items: CartItem[] = [];

  constructor() { }

  public clear(): void {
    this.items = [];
  }

  public addItem(item: MenuItem): void {
    let foundItem = this.items.find((mItem) =>
      mItem.menuItem.id === item.id
    );
    if (foundItem) {
      foundItem.quantity = foundItem.quantity + 1;
    } else {
      this.items.push(new CartItem(item));
    }
  }

  public removeItem(item: CartItem): void {
    this.items.splice(this.items.indexOf(item), 1);
  }

  public total(): number {
    return this.items.map(item => item.value()).
      reduce((prev, value) => prev + value, 0);
  }

}
