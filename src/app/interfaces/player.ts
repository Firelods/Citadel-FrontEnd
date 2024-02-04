import { BoardElement } from './board-element';
import { Card } from './card';
import { Character } from './character';

export interface Player extends BoardElement {
  character?: Character;
  characterIsRevealed?: boolean;
  citadel: Card[];
  hand?: Card[];
  id: number;
  nbGold?: number;
  score?: number;
}
