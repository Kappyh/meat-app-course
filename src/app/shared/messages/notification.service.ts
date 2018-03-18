import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NotificationService {

  notifier = new EventEmitter<any>();

  constructor() { }

  public notify(message: string){
    this.notifier.emit(message);
  }

}
