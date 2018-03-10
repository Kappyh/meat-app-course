import { Injectable } from '@angular/core';
import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';

@Injectable()
export class OrderService {

  constructor(private cartService: ShoppingCartService) { }

  public cartItems() {
    return this.cartService.items;
  }

  public increaseQty(item: CartItem): void {
    this.cartService.increaseQty(item);
  }

  public decreaseQty(item: CartItem):void {
    this.cartService.decreaseQty(item);
  }

  public remove(item: CartItem): void {
    this.cartService.removeItem(item);
  }

}
