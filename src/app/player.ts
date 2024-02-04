import { District } from './district';

export interface Player {
  id: string;
  name: string;
  citadel: District[];
  positionOnBoard?: THREE.Vector3;
  hand?: District[];
}
