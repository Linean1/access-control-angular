import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username: string = '';
  password: string = '';

  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.username, this.password).subscribe({
        next: () => {
          console.log('Login successful');
          this.router.navigate(['/requests']);
        },
        error: (error) => {
          console.error('Login failed', error);
          alert(error.message);
          form.resetForm();
        }
      });
    }
  }
}
