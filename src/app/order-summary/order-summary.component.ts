import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-order-summary',
  templateUrl: './order-summary.component.html'
})
export class OrderSummaryComponent implements OnInit {

  public rated: boolean;

  constructor() { }

  ngOnInit() {
  }

  public rate(): void {
    this.rated = true;
  }

}
