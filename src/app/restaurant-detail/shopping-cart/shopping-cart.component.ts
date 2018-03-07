import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { CartItem } from './cart-item.model';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  public items(): CartItem[] {
    return this.shoppingCartService.items;
  }

  public total(): number {
    return this.shoppingCartService.total();
  }

  public clear(): void {
    this.shoppingCartService.clear();
  }

  public removeItem(item: any): void {
    this.shoppingCartService.removeItem(item);
  }

  public addItem(item: any) {
    this.shoppingCartService.addItem(item);
  }

}
