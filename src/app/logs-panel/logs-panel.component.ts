import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {SocketService} from "../socket.service";

@Component({
  selector: 'app-logs-panel',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './logs-panel.component.html',
  styleUrl: './logs-panel.component.scss'
})
export class LogsPanelComponent implements OnInit {
  messages: string[] = [];
  SocketService: SocketService;

  constructor(SocketService : SocketService) {
    this.SocketService = SocketService;
  }

  ngOnInit(): void {
    this.listenDisplayPlayerStartPlaying();
    this.listenDisplayPlayerPickCards();
    this.listenDisplayPlayerPicksGold();
    this.listenDisplayPlayerChooseCharacter();
    this.listenDisplayPlayerRevealCharacter();
    this.listenDisplayPlayerUseCondottiereDistrict();
    this.listenDisplayPlayerScore();
    this.listenDisplayPlayerGetBonus();
    this.listenDisplayPlayerUseAssassinEffect();
    this.listenDisplayPlayerInfo();
    this.listenDisplayUnusedCharacterInRound();
    this.listenDisplayGameFinished();
    this.listenDisplayRound();
    this.listenDisplayPlayerError();
    this.listenDisplayPlayerStrategy();
    this.listenDisplayStolenCharacter();
    this.listenDisplayActualNumberOfGold();
    this.listenDisplayPlayerUseMagicianEffect();
    this.listenDisplayPlayerHasGotObservatory();
    this.listenDisplayPlayerUseThiefEffect();
    this.listenDisplayPlayerDiscardCard();
    this.listenDisplayPlayerUseLaboratoryEffect();
    this.listenDisplayPlayerUseManufactureEffect();
    this.listenDisplayGoldCollectedFromDisctrictType();
    this.listenDisplayGameStuck();
    this.listenPlayerPlaysCard();
    this.listenDisplayWinner();
  }

  listenPlayerPlaysCard() {
    this.SocketService.listen('playerPlaysCard').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayWinner() {
    this.SocketService.listen('displayWinner').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayPlayerStartPlaying() {
    this.SocketService.listen('displayPlayerStartPlaying').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayPlayerPickCards() {
    this.SocketService.listen('displayPlayerPickCards').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayPlayerPicksGold() {
    this.SocketService.listen('displayPlayerPicksGold').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayPlayerChooseCharacter() {
    this.SocketService.listen('displayPlayerChooseCharacter').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayPlayerRevealCharacter() {
    this.SocketService.listen('displayPlayerRevealCharacter').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayPlayerUseCondottiereDistrict() {
    this.SocketService.listen('displayPlayerUseCondottiereDistrict').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayPlayerScore() {
    this.SocketService.listen('displayPlayerScore').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayPlayerGetBonus() {
    this.SocketService.listen('displayPlayerGetBonus').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayPlayerUseAssassinEffect() {
    this.SocketService.listen('displayPlayerUseAssassinEffect').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayPlayerInfo() {
    this.SocketService.listen('displayPlayerInfo').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayUnusedCharacterInRound() {
    this.SocketService.listen('displayUnusedCharacterInRound').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayGameFinished() {
    this.SocketService.listen('displayGameFinished').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayRound() {
    this.SocketService.listen('displayRound').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayPlayerError() {
    this.SocketService.listen('displayPlayerError').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayPlayerStrategy() {
    this.SocketService.listen('displayPlayerStrategy').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayStolenCharacter() {
    this.SocketService.listen('displayStolenCharacter').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayActualNumberOfGold() {
    this.SocketService.listen('displayActualNumberOfGold').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayPlayerUseMagicianEffect() {
    this.SocketService.listen('displayPlayerUseMagicianEffect').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayPlayerHasGotObservatory() {
    this.SocketService.listen('displayPlayerHasGotObservatory').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayPlayerUseThiefEffect() {
    this.SocketService.listen('displayPlayerUseThiefEffect').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayPlayerDiscardCard() {
    this.SocketService.listen('displayPlayerDiscardCard').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayPlayerUseLaboratoryEffect() {
    this.SocketService.listen('displayPlayerUseLaboratoryEffect').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayPlayerUseManufactureEffect() {
    this.SocketService.listen('displayPlayerUseManufactureEffect').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayGoldCollectedFromDisctrictType() {
    this.SocketService.listen('displayGoldCollectedFromDisctrictType').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  listenDisplayGameStuck() {
    this.SocketService.listen('displayGameStuck').subscribe((data: string) => {
      this.addMessage(data);
    });
  }

  addMessage(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
