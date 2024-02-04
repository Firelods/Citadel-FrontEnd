import { RoundNumberDTO } from '../interfaces/dtos/round-number-dto';
import { WinnerDTO } from '../interfaces/dtos/winner-dto';
import { Player } from '../interfaces/player';
import { LogService } from './log.service';
import { SocketService } from './socket.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  currentRound: number = 0;
  gameFinished: boolean = false;
  gameStuck: boolean = false;
  winner?: Player;

  constructor(
    private socketService: SocketService,
    private logService: LogService
  ) {
    if (this.socketService.isConnected()) {
      this.subToAllGameEvents();
    }
    this.socketService.reconnected$.subscribe(() => {
      this.subToAllGameEvents();
    });
  }

  gameAvailable(): boolean {
    // try to reconnect to the socket
    if (!this.socketService.isConnected()) this.socketService.connect();
    console.log('gameAvailable :');
    console.log(this.socketService.isConnected());

    // if the socket is connected, the game is available

    return this.socketService.isConnected();
  }

  subToAllGameEvents() {
    this.socketService.listen('displayWinner').subscribe((data: WinnerDTO) => {
      console.log('displayWinner :');
      console.log(data);
    });
    this.socketService.listen('displayGameFinished').subscribe((data) => {
      console.log('displayGameFinished :');
      console.log(data);
      this.gameFinished = true;
    });
    this.socketService
      .listen('displayRound')
      .subscribe((data: RoundNumberDTO) => {
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
