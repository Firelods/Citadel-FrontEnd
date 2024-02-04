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

@Component({
  selector: 'app-plateau',
  standalone: true,
  imports: [],
  templateUrl: './plateau.component.html',
  styleUrl: './plateau.component.scss',
})
export class PlateauComponent implements AfterViewInit {
  @ViewChild('container') private containerRef!: ElementRef;
  players: Player[];
  threeService: ThreeService;

  constructor(playerService: PlayerService, characterService: CharacterService, gameService: GameService, threeService: ThreeService) {
    this.players = playerService.getPlayersAsList();
    this.threeService = threeService;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.threeService.init(this.players, this.containerRef);
  }

}
