import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, RouterModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username: string = '';
  password: string = '';

  constructor(private dataService: DataService, private router: Router, private tokenStorage: TokenStorageService) {}

  onSubmit() {
    this.dataService.login(this.username, this.password).subscribe(response => {
      if (response.token) {
        this.tokenStorage.saveToken(response.token);
        this.router.navigate(['/requests']);
      }
    }, error => {
      console.error('Login failed', error);
    });
  }
}
