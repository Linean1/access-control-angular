import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataService } from '../services/data.service';
import { AccessRequest, Role, Service } from '../models';

@Component({
  selector: 'app-request-edit',
  standalone: true,
  imports: [
    CommonModule, RouterModule, FormsModule, MatCardModule, MatButtonModule,
    MatListModule, MatIconModule, MatSelectModule, MatFormFieldModule
  ],
  templateUrl: './request-edit.html',
  styleUrl: './request-edit.css'
})
export class RequestEdit implements OnInit {
  request: AccessRequest | null = null;
  isLoading = true;
  error: string | null = null;

  isEditing = false;
  allServices: Service[] = [];
  allRoles: Role[] = [];
  editedServiceId: number | null = null;
  editedRoleId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRequestDetails(+id);
    }
  }

  loadRequestDetails(id: number): void {
    this.isLoading = true;
    this.dataService.getRequestById(id).subscribe({
      next: (data) => {
        this.request = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Не удалось загрузить детали заявки: ' + (err.error?.message || err.message);
        this.isLoading = false;
      }
    });
  }

  toggleEdit(save: boolean = false): void {
    if (save) {
      if (this.request && this.editedServiceId && this.editedRoleId) {
        this.dataService.updateRequest(this.request.id, this.editedServiceId, this.editedRoleId).subscribe({
          next: (updatedRequest) => {
            this.request = updatedRequest;
            this.isEditing = false;
            alert('Заявка успешно обновлена!');
          },
          error: (err) => alert('Ошибка обновления: ' + (err.error?.message || err.message))
        });
      }
    } else {
      this.isEditing = !this.isEditing;
      if (this.isEditing && this.request) {
        this.dataService.getRequestAccessForm().subscribe(data => {
          this.allServices = data.services;
          this.allRoles = data.roles;
          this.editedServiceId = this.allServices.find(s => s.serviceName === this.request?.serviceName)?.id ?? null;
          this.editedRoleId = this.allRoles.find(r => r.roleName === this.request?.roleName)?.id ?? null;
        });
      }
    }
  }
}
