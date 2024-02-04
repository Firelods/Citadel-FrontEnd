import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { CondottiereEffectDTO } from '../interfaces/dtos/condottiere-effect-dto';
import { MurdererEffectDTO } from '../interfaces/dtos/murderer-effect-dto';
import { CharacterDTO } from '../interfaces/dtos/character-dto';
import { MagicianEffectDTO } from '../interfaces/dtos/magician-effect-dto';
import { PlayerDTO } from '../interfaces/dtos/player-dto';
import { PlayerCollectGoldDTO } from '../interfaces/dtos/player-collect-gold-dto';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private socketService: SocketService) {
    this.subToAllCharacterEvents();
  }

  subToAllCharacterEvents() {
    this.socketService
      .listen('displayPlayerUseCondottiereDistrict')
      .subscribe((data: CondottiereEffectDTO) => {
        console.log('displayPlayerUseCondottiereDistrict :');
        console.log(data);
      });
    this.socketService
      .listen('displayPlayerUseAssassinEffect')
      .subscribe((data: MurdererEffectDTO) => {
        console.log('displayPlayerUseAssassinEffect :');
        console.log(data);
      });
    this.socketService
      .listen('displayUnusedCharacterInRound')
      .subscribe((data: CharacterDTO) => {
        console.log('displayUnusedCharacterInRound :');
        console.log(data);
      });
    this.socketService
      .listen('displayStolenCharacter')
      .subscribe((data: CharacterDTO) => {
        console.log('displayStolenCharacter :');
        console.log(data);
      });
    this.socketService
      .listen('displayPlayerUseMagicianEffect')
      .subscribe((data: MagicianEffectDTO) => {
        console.log('displayPlayerUseMagicianEffect :');
        console.log(data);
      });
    this.socketService
      .listen('displayPlayerUseThiefEffect')
      .subscribe((data: PlayerDTO) => {
        console.log('displayPlayerUseThiefEffect :');
        console.log(data);
      });
    this.socketService
      .listen('displayGoldCollectedFromDisctrictType')
      .subscribe((data: PlayerCollectGoldDTO) => {
        console.log('displayGoldCollectedFromDisctrictType :');
        console.log(data);
      });
  }
}
