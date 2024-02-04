import { Component } from '@angular/core';
import { Player } from '../../interfaces/player';
import { PlayerService } from '../../services/player.service';
import { District } from '../../interfaces/district';
import { NormalizePipe } from './normalize.pipe';

@Component({
  selector: 'app-player-info',
  standalone: true,
  imports: [NormalizePipe],
  templateUrl: './player-info.component.html',
  styleUrl: './player-info.component.scss',
})
export class PlayerInfoComponent {
  constructor(public playerService: PlayerService) {}

  printInfo() {
    this.playerService.getFocusedPlayer()!.hand!.forEach((card) => {
      console.log(card);
    });
  }
}
