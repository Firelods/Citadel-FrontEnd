import { Routes } from '@angular/router';
import { PlateauComponent } from './plateau/plateau.component';
import { SidePanelRoutes } from './side-panel/side-panel.routes';
import { SidePanelComponent } from './side-panel/side-panel.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'plateau',
    pathMatch: 'full',
  },
  {
    path: 'plateau',
    component: PlateauComponent,
    children: SidePanelRoutes,
  },
  {
    path: 'side-panel',
    component: SidePanelComponent,
    children: SidePanelRoutes,
  },
];
