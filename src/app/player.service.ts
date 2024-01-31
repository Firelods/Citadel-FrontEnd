import { Injectable } from '@angular/core';
import { Player } from './player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  players: Player[] = [];
  constructor() {
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
      // Ajoutez d'autres joueurs selon le besoin
    ];
  }
}
