import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MEAT_API } from '../app.api';
import { ErrorHandler } from 'app/app.error-hadler';
import { Restaurant } from 'app/restaurants/restaurant/restaurant.model';
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model';

@Injectable()

export class RestaurantsService {

  public rests: Restaurant[] = [
  ];

  constructor(private http: HttpClient) { }
  public restaurants(search?: string): Observable<Restaurant[]> {
    let params: HttpParams = undefined;
    if (search) {
      params = new HttpParams().set('q', search);
    }
    return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, { params: params })
  }

  public restaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
  }

  public reviewsOfRestaurant(id: string): Observable<any> {
    return this.http.get<any>(`${MEAT_API}/restaurants/${id}/reviews`)
  }

  public menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
  }

}
