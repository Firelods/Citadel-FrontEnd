import { SocketService } from './socket.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  socketService: SocketService = new SocketService();

  constructor() {
    this.subToAllGameEvents();
  }

  subToAllGameEvents() {
    this.socketService.listen('displayWinner').subscribe((data) => {
      console.log('displayWinner :');
      console.log(data);
    });
    this.socketService.listen('displayGameFinished').subscribe((data) => {
      console.log('displayGameFinished :');
      console.log(data);
    });
    this.socketService.listen('displayRound').subscribe((data) => {
      console.log('displayRound :');
      console.log(data);
    });
    this.socketService.listen('displayGameStuck').subscribe((data) => {
      console.log('displayGameStuck :');
      console.log(data);
    });
  }
}
