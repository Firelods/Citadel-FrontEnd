import { RoundNumberDTO } from '../interfaces/dtos/round-number-dto';
import { WinnerDTO } from '../interfaces/dtos/winner-dto';
import { Player } from '../interfaces/player';
import { SocketService } from './socket.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  socketService: SocketService = new SocketService();
  currentRound: number = 0;
  gameFinished: boolean = false;
  gameStuck: boolean = false;
  winner?: Player;

  constructor() {
    this.subToAllGameEvents();
  }

  subToAllGameEvents() {
    this.socketService.listen('displayWinner').subscribe((data:WinnerDTO) => {
      console.log('displayWinner :');
      console.log(data);

    });
    this.socketService.listen('displayGameFinished').subscribe((data) => {
      console.log('displayGameFinished :');
      console.log(data);
      this.gameFinished = true;
    });
    this.socketService.listen('displayRound').subscribe((data:RoundNumberDTO) => {
      console.log('displayRound :');
      console.log(data);
      this.currentRound = data.roundNumber;
    });
    this.socketService.listen('displayGameStuck').subscribe((data) => {
      console.log('displayGameStuck :');
      console.log(data);
      this.gameStuck = true;
    });
  }
}
