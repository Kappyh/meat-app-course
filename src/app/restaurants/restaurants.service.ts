import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MEAT_API } from '../app.api';
import { ErrorHandler } from 'app/app.error-hadler'
import { Restaurant } from 'app/restaurants/restaurant/restaurant.model';

@Injectable()

export class RestaurantsService {

  public rests: Restaurant[] = [
  ];

  constructor(private http: Http) { }
  public restaurants(): Observable<Restaurant[]> {
    return this.http.get(`${MEAT_API}/restaurants`)
      .map(response => response.json())
      .catch(ErrorHandler.handleError)
  }

}
