import { SocketService } from './socket.service';
import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  players: Player[] = [];
  socketService: SocketService = new SocketService();
  constructor() {
    this.subToAllPlayerEvents();
    this.players = [
      {
        id: 'player1',
        name: 'Joueur 1',
        citadel: [
          { cost: 1 },
          { cost: 2 },
          { cost: 3 },
          { cost: 4 },
          { cost: 5 },
          { cost: 6 },
          { cost: 7 },
          { cost: 8 },
        ],
      },
      {
        id: 'player2',
        name: 'Joueur 2',
        citadel: [
          { cost: 1 },
          { cost: 2 },
          { cost: 3 },
          { cost: 4 },
          { cost: 5 },
          { cost: 6 },
        ],
      },

      {
        id: 'player3',
        name: 'Joueur 3',
        citadel: [
          { cost: 1 },
          { cost: 2 },
          { cost: 3 },
          { cost: 4 },
          { cost: 5 },
          { cost: 6 },
        ],
      },
      {
        id: 'player4',
        name: 'Joueur 4',
        citadel: [{ cost: 1 }, { cost: 2 }, { cost: 3 }],
      },
      { id: 'player5', name: 'Joueur 5', citadel: [{ cost: 1 }] },
      {
        id: 'player6',
        name: 'Joueur 6',
        citadel: [
          { cost: 1 },
          { cost: 2 },
          { cost: 3 },
          { cost: 4 },
          { cost: 5 },
          { cost: 6 },
        ],
      },
    ];
  }

  subToAllPlayerEvents() {
    this.socketService.listen('playerPlaysCard').subscribe((data: any) => {
      console.log('playerPlaysCard :');
      console.log(data);
    });
    this.socketService.listen('displayPlayerStartPlaying').subscribe((data) => {
      console.log('displayPlayerStartPlaying :');
      console.log(data);
    });
    this.socketService.listen('displayPlayerPickCards').subscribe((data) => {
      console.log('displayPlayerPickCards :');
      console.log(data);
    });
    this.socketService.listen('displayPlayerPicksGold').subscribe((data) => {
      console.log('displayPlayerPicksGold :');
      console.log(data);
    });
    this.socketService.listen('displayPlayerChooseCharacter').subscribe((data) => {
      console.log('displayPlayerChooseCharacter :');
      console.log(data);
    });

    this.socketService.listen('displayPlayerScore').subscribe((data) => {
      console.log('displayPlayerScore :');
      console.log(data);
    });
    this.socketService.listen('displayPlayerGetBonus').subscribe((data) => {
      console.log('displayPlayerGetBonus :');
      console.log(data);
    });
    this.socketService.listen('displayPlayerInfo').subscribe((data) => {
      console.log('displayPlayerInfo :');
      console.log(data);
    });
    this.socketService.listen('displayPlayerError').subscribe((data) => {
      console.log('displayPlayerError :');
      console.log(data);
    });
    this.socketService.listen('displayPlayerStrategy').subscribe((data) => {
      console.log('displayPlayerStrategy :');
      console.log(data);
    });
    this.socketService.listen('displayPlayerDiscardCard').subscribe((data) => {
      console.log('displayPlayerDiscardCard :');
      console.log(data);
    });
    this.socketService.listen('displayPlayerUseManufactureEffect').subscribe((data) => {
      console.log('displayPlayerUseManufactureEffect :');
      console.log(data);
    });
    this.socketService.listen('displayPlayerUseLaboratoryEffect').subscribe((data) => {
      console.log('displayPlayerUseLaboratoryEffect :');
      console.log(data);
    });
    this.socketService.listen('displayPlayerHasGotObservatory').subscribe((data) => {
      console.log('displayPlayerHasGotObservatory :');
      console.log(data);
    });
    this.socketService.listen('displayActualNumberOfGold').subscribe((data) => {
      console.log('displayActualNumberOfGold :');
      console.log(data);
    });
  }
}
