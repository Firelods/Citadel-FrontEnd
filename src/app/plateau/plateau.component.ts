import { ThreeService } from './../services/three.service';
import { CharacterService } from './../services/character.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { Player } from '../interfaces/player';
import { PlayerService } from '../services/player.service';
import { GameService } from '../services/game.service';
import { SidePanelComponent } from '../side-panel/side-panel.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plateau',
  standalone: true,
  imports: [SidePanelComponent],
  templateUrl: './plateau.component.html',
  styleUrl: './plateau.component.scss',
})
export class PlateauComponent implements AfterViewInit {
  @ViewChild('container') private containerRef!: ElementRef;
  players: Player[];
  threeService: ThreeService;

  constructor(
    private playerService: PlayerService,
    characterService: CharacterService,
    private gameService: GameService,
    private router: Router,
    threeService: ThreeService
  ) {
    this.players = playerService.getPlayersAsList();
    this.threeService = threeService;
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (!this.gameService.gameAvailable()) {
        this.router.navigate(['/home']);
      }
    }, 1000);
  }

  ngAfterViewInit(): void {
    this.threeService.init(this.players, this.containerRef);
  }
}
