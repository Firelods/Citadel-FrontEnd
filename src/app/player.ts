import { District } from './district';

export interface Player {
  id: string;
  name: string;
  citadel: District[];
}
