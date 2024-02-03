import { BoardElement } from './board-element';
import { Character } from './character';
import { District } from './district';

export interface Player extends BoardElement{
  character?:Character;
  characterIsRevealed?:boolean;
  citadel: District[];
  hand?: District[];
  id: string;
  nbGold?: number;
  score?:number;
}
