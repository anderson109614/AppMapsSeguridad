import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subscriber, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() {
    this.socket=io(this.url);
   }
  socket:any;
  readonly url:string="http://157.245.248.79:3000/";
  listen(eventName:string){
    return new Observable((Subscriber)=>{
      this.socket.on(eventName,(data)=>{
        Subscriber.next(data);
      })
    });
  }

  emit(eventName:string,data:any){
    this.socket.emit(eventName,data);
  }
}
