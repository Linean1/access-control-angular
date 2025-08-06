import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, NgForm } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Role, Service, RequestAccessFormData } from '../models';

@Component({
  selector: 'app-request-access',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './request-access.html',
  styleUrl: './request-access.css'
})
export class RequestAccess implements OnInit {
  roles: Role[] = [];
  services: Service[] = [];
  selectedServiceId: number | null = null;
  selectedRoleId: number | null = null;

  @ViewChild('requestForm') requestForm!: NgForm;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.loadRequestAccessFormData();
  }

  loadRequestAccessFormData(): void {
    this.dataService.getRequestAccessForm().subscribe({
      next: (data: RequestAccessFormData) => {
        this.roles = data.roles;
        this.services = data.services;
        console.log('Loaded roles:', this.roles);
        console.log('Loaded services:', this.services);
      },
      error: (error) => {
        console.error('Error loading request access form data:', error);
        alert('Ошибка загрузки данных для формы: ' + (error.message || error.statusText));
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid && this.selectedServiceId !== null && this.selectedRoleId !== null) {
      this.dataService.submitRequest(this.selectedServiceId, this.selectedRoleId).subscribe({
        next: (response) => {
          console.log('Request submitted successfully:', response);
          alert('Заявка успешно отправлена!');
          this.router.navigate(['/requests']);
          form.resetForm();
        },
        error: (error) => {
          console.error('Error submitting request:', error);
          alert('Ошибка при отправке заявки: ' + (error.error || error.message || error.statusText));
        }
      });
    }
  }
}
