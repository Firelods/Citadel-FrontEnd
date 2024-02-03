import { Player } from "../player";

export interface PlayerGetBonusDTO {
  player: Player;
  bonusPoint: number;
  bonusName: string;
}
