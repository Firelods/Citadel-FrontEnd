import { BoardElement } from './board-element';
import { Card } from './card';
import { Character } from './character';

export interface Player extends BoardElement {
  character?: Character;
  characterIsRevealed?: boolean;
  citadel: Card[];
  citadelOnBoard?: THREE.Group;
  citadelGrid?: boolean[][]; // 2D array of boolean to represent the citadel on the board
  hand?: Card[];
  id: number;
  nbGold?: number;
  score?: number;
}
