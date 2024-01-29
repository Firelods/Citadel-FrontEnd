import { Routes } from '@angular/router';
import { PlateauComponent } from './plateau/plateau.component';

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
];
