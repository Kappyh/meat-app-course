import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'app/restaurants/restaurant/restaurant.model';
import { RestaurantsService } from 'app/restaurants/restaurants.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent implements OnInit {

  public restaurants: Restaurant[] = undefined;

  constructor(private restaurantsServices: RestaurantsService) { }

  ngOnInit() {
    this.restaurantsServices.restaurants().subscribe(
      restaurants => this.restaurants = restaurants
    );
  }

}
