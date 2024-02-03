import { Player } from "../player";

export interface PlayerGetBonusDTO {
  player: Player;
  bonusPoints: number;
  bonusName: string;
}
