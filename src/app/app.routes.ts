import { Routes } from '@angular/router';
import { PlateauComponent } from './plateau/plateau.component';
import {LogsPanelComponent} from "./logs-panel/logs-panel.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'plateau',
    pathMatch: 'full',
  },
  {
    path: 'plateau',
    component: PlateauComponent,
  },
  {
    path: 'logs',
    component: LogsPanelComponent,
  }
];
