import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { Restaurant } from '../restaurants/restaurant/restaurant.model';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  public restaurant: Restaurant;

  constructor(private restaurantaService: RestaurantsService,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.restaurantaService.restaurantById(this.activatedRoute.snapshot.params['id'])
    .subscribe(restaurant => this.restaurant = restaurant);
  }

}
