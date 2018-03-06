import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RestaurantsService } from '../restaurants/restaurants.service';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  public reviews: Observable<any>;

  constructor(private restaurantService: RestaurantsService,
    private activadRoute: ActivatedRoute) { }

  ngOnInit() {
    this.reviews = this.restaurantService
    .reviewsOfRestaurant(this.activadRoute.parent.snapshot.params['id']);
  }

}
