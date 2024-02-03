import { District } from "../district";
import { Player } from "../player";

export interface CondottiereEffectDTO {
  attacker: Player
  defender: Player
  district:District
}
