import { Component } from '@angular/core';
import { Player } from '../../interfaces/player';

@Component({
  selector: 'app-player-info',
  standalone: true,
  imports: [],
  templateUrl: './player-info.component.html',
  styleUrl: './player-info.component.scss',
})
export class PlayerInfoComponent {
  currentPlayer: Player = {
    citadel: [
      { cost: 1, name: 'cimetiere' },
      { cost: 2, name: 'caserne' },
      { cost: 3 },
      { cost: 4 },
      { cost: 5 },
      { cost: 6 },
      { cost: 7 },
      { cost: 8 },
    ],
    id: 'player1',
  };
}
