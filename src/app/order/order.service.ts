import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order } from './order.model';
import { MEAT_API } from '../app.api';
import { LoginService } from '../security/login.service';


@Injectable()
export class OrderService {

  constructor(private cartService: ShoppingCartService,
    private http: HttpClient) { }

  public itemsValue(): number {
    return this.cartService.total();
  }

  public cartItems() {
    return this.cartService.items;
  }

  public increaseQty(item: CartItem): void {
    this.cartService.increaseQty(item);
  }

  public decreaseQty(item: CartItem): void {
    this.cartService.decreaseQty(item);
  }

  public remove(item: CartItem): void {
    this.cartService.removeItem(item);
  }

  public clear(): void {
    this.cartService.clear();
  }

  public checkOrder(order: Order): Observable<string> {
    return this.http.post<Order>(`${MEAT_API}/orders`, order)
      .pipe(map(order => order.id))
  }

}
