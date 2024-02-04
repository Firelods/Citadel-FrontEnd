import { Injectable } from '@angular/core';
import io, { Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket?: Socket;

  constructor() {}

  connect(): void {
    this.socket = io('http://localhost:5001');
    this.subToAllEvents();
  }

  getSocket(): Socket {
    return this.socket!;
  }

  listen(eventName: string): Observable<any> {
    console.log('Socket service listening to ' + eventName);
    return new Observable((subscriber) => {
      this.socket!.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  subToAllEvents() {
    this.listen('connect').subscribe((data) => {
      console.log('connected');
    });
    this.listen('disconnect').subscribe((data) => {
      console.log('disconnected');
    });
  }
}
