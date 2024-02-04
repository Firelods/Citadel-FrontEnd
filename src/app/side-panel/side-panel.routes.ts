import { Routes } from '@angular/router';
import { PlayerInfoComponent } from './player-info/player-info.component';

export const SidePanelRoutes: Routes = [
  {
    path: '',
    redirectTo: 'player-info',
    pathMatch: 'full',
  },
  {
    path: 'player-info',
    component: PlayerInfoComponent,
  },
];
