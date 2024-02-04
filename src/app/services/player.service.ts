import { SocketService } from './socket.service';
import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player';
import { PlayerAndCardDTO } from '../interfaces/dtos/player-and-card-dto';
import { PlayerPickCardsDTO } from '../interfaces/dtos/player-pick-cards-dto';
import { PlayerPickGoldDTO } from '../interfaces/dtos/player-pick-gold-dto';
import { PlayerDTO } from '../interfaces/dtos/player-dto';
import { PlayerGetBonusDTO } from '../interfaces/dtos/player-get-bonus-dto';
import { PlayerAndMessageDTO } from '../interfaces/dtos/player-and-message-dto';
import { Card } from '../interfaces/card';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playersByIdMap: Map<number, Player> = new Map<number, Player>();
  private focusedPlayer?: number;
  constructor(
    private socketService: SocketService,
    private logService: LogService
  ) {
    if (this.socketService.isConnected()) {
      this.subToAllPlayerEvents();
    }
    this.socketService.reconnected$.subscribe(() => {
      this.subToAllPlayerEvents();
    });
    this.playersByIdMap.set(1, {
      id: 1,
      citadel: [
        { district: { cost: 1, name: 'Bazar' } },
        { district: { cost: 2, name: 'Taverne' } },
        { district: { cost: 8, name: 'Château' } },
      ],
    });
    this.playersByIdMap.set(2, {
      id: 2,
      citadel: [
        { district: { cost: 1, name: 'Bazar' } },
        { district: { cost: 2, name: 'Taverne' } },
        { district: { cost: 3, name: 'Cimetière' } },
        { district: { cost: 4, name: 'Manoir' } },
        { district: { cost: 5, name: 'Château' } },
      ],
    });
    this.playersByIdMap.set(3, {
      id: 3,
      citadel: [
        { district: { cost: 1, name: 'Bazar' } },
        { district: { cost: 2, name: 'Bazar' } },
        { district: { cost: 3, name: 'Bazar' } },
        { district: { cost: 4, name: 'Bazar' } },
        { district: { cost: 5, name: 'Bazar' } },
        { district: { cost: 6, name: 'Bazar' } },
      ],
    });
    this.playersByIdMap.set(4, {
      id: 4,
      citadel: [
        { district: { cost: 1, name: 'Bazar' } },
        { district: { cost: 2, name: 'Bazar' } },
        { district: { cost: 3, name: 'Bazar' } },
      ],
    });
  }

  getPlayersAsList(): Player[] {
    return Array.from(this.playersByIdMap.values());
  }

  subToAllPlayerEvents() {
    this.socketService
      .listen('playerPlaysCard')
      .subscribe((data: PlayerAndCardDTO) => {
        this.playerPlaysCard(data.player, data.card);
      });
    this.socketService
      .listen('displayPlayerStartPlaying')
      .subscribe((data: PlayerDTO) => {
        this.udpatePlayer(data.player);
        this.logService.add(
          'Le joueur ' + data.player.id + ' commence à jouer'
        );
      });
    this.socketService
      .listen('displayPlayerPickCards')
      .subscribe((data: PlayerPickCardsDTO) => {
        this.udpatePlayer(data.player);
        this.logService.add(
          'Le joueur ' +
            data.player.id +
            ' a pioché ' +
            data.nbOfCards +
            ' cartes'
        );
      });
    this.socketService
      .listen('displayPlayerPicksGold')
      .subscribe((data: PlayerPickGoldDTO) => {
        this.udpatePlayer(data.player);
        this.logService.add(
          'Le joueur ' +
            data.player.id +
            ' a pioché ' +
            data.nbOfGold +
            " pièces d'or"
        );
      });
    this.socketService
      .listen('displayPlayerChooseCharacter')
      .subscribe((data: PlayerDTO) => {
        this.udpatePlayer(data.player);
        this.logService.add(
          'Le joueur ' + data.player.id + ' a choisi son personnage'
        );
      });

    this.socketService
      .listen('displayPlayerScore')
      .subscribe((data: PlayerDTO) => {
        this.udpatePlayer(data.player);
        this.logService.add(
          'Le joueur ' + data.player.id + ' a un score de ' + data.player.score
        );
      });
    this.socketService
      .listen('displayPlayerGetBonus')
      .subscribe((data: PlayerGetBonusDTO) => {
        this.udpatePlayer(data.player);
        this.logService.add(
          'Le joueur ' +
            data.player.id +
            ' a reçu un bonus de ' +
            data.bonusPoints +
            ' points pour : ' +
            data.bonusName
        );
      });
    this.socketService
      .listen('displayPlayerInfo')
      .subscribe((data: PlayerDTO) => {
        this.udpatePlayer(data.player);
      });
    this.socketService
      .listen('displayPlayerError')
      .subscribe((data: PlayerAndMessageDTO) => {
        this.logService.add(
          'Le joueur ' +
            data.player.id +
            ' a produit une erreur : ' +
            data.message
        );
      });
    this.socketService
      .listen('displayPlayerStrategy')
      .subscribe((data: PlayerAndMessageDTO) => {
        this.udpatePlayer(data.player);
        this.logService.add(
          'Le joueur ' +
            data.player.id +
            ' a effectué la stratégie : ' +
            data.message
        );
      });
    this.socketService
      .listen('displayPlayerDiscardCard')
      .subscribe((data: PlayerAndCardDTO) => {
        this.udpatePlayer(data.player);
        this.logService.add(
          'Le joueur ' +
            data.player.id +
            ' a défaussé la carte : ' +
            data.card.district.name
        );
      });
    this.socketService
      .listen('displayPlayerUseManufactureEffect')
      .subscribe((data: PlayerDTO) => {
        this.udpatePlayer(data.player);
        this.logService.add(
          'Le joueur ' +
            data.player.id +
            ' a utilisé un effet de la Manufacture'
        );
      });
    this.socketService
      .listen('displayPlayerUseLaboratoryEffect')
      .subscribe((data: PlayerDTO) => {
        this.udpatePlayer(data.player);
        this.logService.add(
          'Le joueur ' +
            data.player.id +
            " utilise le laboratoire pour défausser une carte et gagner une pièce d'or (s'il en reste dans la banque)."
        );
      });
    this.socketService
      .listen('displayPlayerHasGotObservatory')
      .subscribe((data: PlayerDTO) => {
        this.udpatePlayer(data.player);
        this.logService.add(
          'Le joueur ' +
            data.player.id +
            " peut regarder 3 cartes grâce à l'Observatoire"
        );
      });
    this.socketService
      .listen('displayActualNumberOfGold')
      .subscribe((data: PlayerDTO) => {
        this.udpatePlayer(data.player);
        this.logService.add(
          'Le joueur ' +
            data.player.id +
            ' a maintenant' +
            data.player.nbGold +
            " pièces d'or"
        );
      });
  }

  udpatePlayer(player: Player) {
    let positionOnBoardOfPlayerToUdpate = this.playersByIdMap.get(
      player.id
    )?.positionOnBoard;
    if (!positionOnBoardOfPlayerToUdpate) {
      throw new Error('Player position on board is not defined');
    }
    player.positionOnBoard = positionOnBoardOfPlayerToUdpate;
    this.playersByIdMap.set(player.id, player);
  }

  playerPlaysCard(player: Player, card: Card) {
    this.udpatePlayer(player);
    this.logService.add(
      'Le joueur ' + player.id + ' a joué la carte ' + card.district.cost
    );
  }

  getFocusedPlayer(): Player | undefined {
    return this.playersByIdMap.get(this.focusedPlayer!);
  }

  setFocusedPlayer(playerPosition: THREE.Vector3) {
    this.focusedPlayer = this.getPlayersAsList().find(
      (player) =>
        playerPosition.x === player.positionOnBoard?.x &&
        playerPosition.y === player.positionOnBoard?.y &&
        playerPosition.z === player.positionOnBoard?.z
    )!.id;
  }
}
