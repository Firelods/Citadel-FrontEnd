import { Character } from "../character";
import { Player } from "../player";

export interface MurdererEffectDTO {
  player:Player;
  target:Character;
}
