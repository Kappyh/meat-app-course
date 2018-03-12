import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order } from './order.model';
import { MEAT_API } from '../app.api';


@Injectable()
export class OrderService {

  constructor(private cartService: ShoppingCartService, private http: Http) { }

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
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${MEAT_API}/orders`,
      JSON.stringify(order), new RequestOptions({ headers: headers }))
      .map(response => response.json())
      .map(order=>order.id)
  }

}
