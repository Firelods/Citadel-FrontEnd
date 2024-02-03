import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  socketService: SocketService = new SocketService();

  constructor() {
    this.subToAllCharacterEvents();
  }

  subToAllCharacterEvents() {
    this.socketService.listen('displayPlayerUseCondottiereDistrict').subscribe((data) => {
      console.log('displayPlayerUseCondottiereDistrict :');
      console.log(data);
    });
    this.socketService.listen('displayPlayerUseAssassinEffect').subscribe((data) => {
      console.log('displayPlayerUseAssassinEffect :');
      console.log(data);
    });
    this.socketService.listen('displayUnusedCharacterInRound').subscribe((data) => {
      console.log('displayUnusedCharacterInRound :');
      console.log(data);
    });
    this.socketService.listen('displayStolenCharacter').subscribe((data) => {
      console.log('displayStolenCharacter :');
      console.log(data);
    });
    this.socketService.listen('displayPlayerUseMagicianEffect').subscribe((data) => {
      console.log('displayPlayerUseMagicianEffect :');
      console.log(data);
    });
    this.socketService.listen('displayPlayerUseThiefEffect').subscribe((data) => {
      console.log('displayPlayerUseThiefEffect :');
      console.log(data);
    });
    this.socketService.listen('displayGoldCollectedFromDisctrictType').subscribe((data) => {
      console.log('displayGoldCollectedFromDisctrictType :');
      console.log(data);
    });
  }
}
