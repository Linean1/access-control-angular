import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'Access Control System';
  isAuthenticated = false;

  constructor(public authService: AuthService, private router: Router) {
    this.authService.isAuthenticated$.subscribe(status => this.isAuthenticated = status);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

