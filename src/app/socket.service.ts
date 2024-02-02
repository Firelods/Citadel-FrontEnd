import { Injectable } from '@angular/core';
import io, { Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:5001');
    this.subToAllEvents();
  }

  getSocket(): Socket {
    return this.socket;
  }
  listen(eventName: string): Observable<any> {
    console.log('Socket service listening to ' + eventName);
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
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
    this.listen('playerPlaysCard').subscribe((data) => {
      console.log('playerPlaysCard :');
      console.log(data);
    });
    this.listen('displayWinner').subscribe((data) => {
      console.log('displayWinner :');
      console.log(data);

    });
    this.listen('displayPlayerStartPlaying').subscribe((data) => {
      console.log('displayPlayerStartPlaying :');
      console.log(data);
    });
    this.listen('displayPlayerPickCards').subscribe((data) => {
      console.log('displayPlayerPickCards :');
      console.log(data);
    });
    this.listen('displayPlayerPicksGold').subscribe((data) => {
      console.log('displayPlayerPicksGold :');
      console.log(data);
    });
    this.listen('displayPlayerChooseCharacter').subscribe((data) => {
      console.log('displayPlayerChooseCharacter :');
      console.log(data);
    });
    this.listen('displayPlayerUseCondottiereDistrict').subscribe((data) => {
      console.log('displayPlayerUseCondottiereDistrict :');
      console.log(data);
    });
    this.listen('displayPlayerScore').subscribe((data) => {
      console.log('displayPlayerScore :');
      console.log(data);
    });
    this.listen('displayPlayerGetBonus').subscribe((data) => {
      console.log('displayPlayerGetBonus :');
      console.log(data);
    });
    this.listen('displayPlayerUseAssassinEffect').subscribe((data) => {
      console.log('displayPlayerUseAssassinEffect :');
      console.log(data);
    });
    this.listen('displayPlayerInfo').subscribe((data) => {
      console.log('displayPlayerInfo :');
      console.log(data);
    });
    this.listen('displayUnusedCharacterInRound').subscribe((data) => {
      console.log('displayUnusedCharacterInRound :');
      console.log(data);
    });
    this.listen('displayGameFinished').subscribe((data) => {
      console.log('displayGameFinished :');
      console.log(data);
    });
    this.listen('displayRound').subscribe((data) => {
      console.log('displayRound :');
      console.log(data);
    });
    this.listen('displayPlayerError').subscribe((data) => {
      console.log('displayPlayerError :');
      console.log(data);
    });
    this.listen('displayPlayerStrategy').subscribe((data) => {
      console.log('displayPlayerStrategy :');
      console.log(data);
    });
    this.listen('displayStolenCharacter').subscribe((data) => {
      console.log('displayStolenCharacter :');
      console.log(data);
    });
    this.listen('displayActualNumberOfGold').subscribe((data) => {
      console.log('displayActualNumberOfGold :');
      console.log(data);
    });
    this.listen('displayPlayerUseMagicianEffect').subscribe((data) => {
      console.log('displayPlayerUseMagicianEffect :');
      console.log(data);
    });
    this.listen('displayPlayerHasGotObservatory').subscribe((data) => {
      console.log('displayPlayerHasGotObservatory :');
      console.log(data);
    });
    this.listen('displayPlayerUseThiefEffect').subscribe((data) => {
      console.log('displayPlayerUseThiefEffect :');
      console.log(data);
    });
    this.listen('displayPlayerDiscardCard').subscribe((data) => {
      console.log('displayPlayerDiscardCard :');
      console.log(data);
    });
    this.listen('displayPlayerUseLaboratoryEffect').subscribe((data) => {
      console.log('displayPlayerUseLaboratoryEffect :');
      console.log(data);
    });
    this.listen('displayPlayerUseManufactureEffect').subscribe((data) => {
      console.log('displayPlayerUseManufactureEffect :');
      console.log(data);
    });
    this.listen('displayGoldCollectedFromDisctrictType').subscribe((data) => {
      console.log('displayGoldCollectedFromDisctrictType :');
      console.log(data);
    });
    this.listen('displayGameStuck').subscribe((data) => {
      console.log('displayGameStuck :');
      console.log(data);
    });
  }
}
