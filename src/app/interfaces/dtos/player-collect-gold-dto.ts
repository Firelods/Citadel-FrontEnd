import { Player } from "../player";

export interface PlayerCollectGoldDTO {
  player: Player;
  nbOfGold: number;
  districType:string
}
