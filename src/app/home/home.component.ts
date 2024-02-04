import { Component } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private socketService: SocketService, private router: Router) {}

  connect() {
    this.socketService.connect();
    this.router.navigate(['/plateau']);
  }
}
