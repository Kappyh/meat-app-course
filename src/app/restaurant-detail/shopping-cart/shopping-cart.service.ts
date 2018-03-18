import { Injectable } from '@angular/core';
import { CartItem } from './cart-item.model';
import { MenuItem } from '../menu-item/menu-item.model';
import { NotificationService } from '../../shared/messages/notification.service';

@Injectable()
export class ShoppingCartService {

  public items: CartItem[] = [];

  constructor(private notificationService: NotificationService) { }

  public clear(): void {
    this.items = [];
  }

  public addItem(item: MenuItem): void {
    let foundItem = this.items.find((mItem) =>
      mItem.menuItem.id === item.id
    );
    if (foundItem) {
      this.increaseQty(foundItem);
    } else {
      this.items.push(new CartItem(item));
    }
    this.notificationService.notify(`Você adicionou o item ${item.name}`);
  }

  public increaseQty(item: CartItem): void {
    item.quantity = item.quantity + 1;
  }

  public decreaseQty(item: CartItem): void {
    item.quantity = item.quantity - 1;
    if (item.quantity === 0) {
      this.removeItem(item);
    }
  }

  public removeItem(item: CartItem): void {
    this.items.splice(this.items.indexOf(item), 1);
    this.notificationService.notify(`Você removeu o item ${item.menuItem.name}`);
  }

  public total(): number {
    return this.items.map(item => item.value()).
      reduce((prev, value) => prev + value, 0);
  }

}
