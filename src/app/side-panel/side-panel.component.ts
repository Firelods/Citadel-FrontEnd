import { Component } from '@angular/core';
import { LogsPanelComponent } from './logs-panel/logs-panel.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidePanelRoutes } from './side-panel.routes';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [LogsPanelComponent, RouterModule],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss',
})
export class SidePanelComponent {}
