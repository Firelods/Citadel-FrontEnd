import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-logs-panel',
  standalone: true,
  imports: [],
  templateUrl: './logs-panel.component.html',
  styleUrl: './logs-panel.component.scss',
})
export class LogsPanelComponent implements OnInit {
  constructor(public logService: LogService) {}

  ngOnInit(): void {}

  clear() {
    // this.messages = [];
  }
}
