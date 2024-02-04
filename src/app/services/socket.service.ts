import { Injectable } from '@angular/core';
import io, { Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket?: Socket;
  private reconnectedSource = new Subject<void>();
  public reconnected$ = this.reconnectedSource.asObservable();

  constructor(private router: Router) {}

  connect(): void {
    this.socket = io('http://localhost:5001');

    this.subToAllEvents();
  }

  getSocket(): Socket {
    return this.socket!;
  }

  isConnected(): boolean {
    // test if the socket is connected
    if (this.socket === undefined) {
      return false;
    }
    return this.socket!.connected;
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
      this.router.navigate(['/plateau']);
      this.reconnectedSource.next();
    });
    this.listen('disconnect').subscribe((data) => {
      console.log('disconnected');
    });
  }
}
