import { BoardElement } from './board-element';

export interface District extends BoardElement {
  cost: number;
  disctrictType?: string;
  name: string;
  uuid?: string;
}
