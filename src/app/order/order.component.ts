import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  public orderForm: FormGroup;

  public emailPattern: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  public numberPattern: RegExp = /^[0-9]*$/;

  public paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' }
  ];

  public delivery: number;
  public orderId: string;

  constructor(private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.delivery = 8;
    this.orderForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)]
      }),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required])
    }, { validators: OrderComponent.equalsTo, updateOn: 'blur' });
  }

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');
    if (!email || !emailConfirmation) {
      return undefined;
    }
    if (email.value !== emailConfirmation.value) {
      return { emailsNotMatch: true };
    }
    return undefined;
  }

  public itemsValue(): number {
    return this.orderService.itemsValue();
  }

  public cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  public increaseQty(item: CartItem): void {
    this.orderService.increaseQty(item);
  }

  public decreaseQty(item: CartItem): void {
    this.orderService.decreaseQty(item);
  }

  public remove(item: CartItem): void {
    this.orderService.remove(item);
  }

  public isOrderCompleted(): boolean {
    return this.orderId !== undefined;
  }

  public checkOrder(order: Order) {
    order.orderItems = this.cartItems().map(
      (item: CartItem) => new OrderItem(item.quantity, item.menuItem.id));
    this.orderService.checkOrder(order)
      .pipe(tap((orderId: string) => {
        this.orderId = orderId;
      }))
      .subscribe((orderID: string) => {
        this.router.navigate(['/order-summary']);
        this.orderService.clear();
      });
  }


}
