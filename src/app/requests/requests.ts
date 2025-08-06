import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { AccessRequest, User } from '../models';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [
    MatButtonModule, RouterModule, MatTableModule, MatTabsModule, MatCardModule, CommonModule, MatIconModule
  ],
  templateUrl: './requests.html',
  styleUrls: ['./requests.css']
})
export class Requests implements OnInit {
  userDisplayedColumns: string[] = ['id', 'service', 'role', 'status', 'requestDate', 'actions'];
  ownerDisplayedColumns: string[] = ['id', 'user', 'service', 'role', 'status', 'actions'];
  adminDisplayedColumns: string[] = ['id', 'user', 'service', 'role', 'status', 'actions'];

  requests: AccessRequest[] = [];
  ownerRequests: AccessRequest[] = [];
  adminRequests: AccessRequest[] = [];
  currentUser: User | null = null;
  isOwner: boolean = false;
  isAdmin: boolean = false;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    this.dataService.getRequests().subscribe({
      next: (data) => {
        this.requests = data.userRequests || [];
        this.ownerRequests = data.ownerApprovalRequests || [];
        this.adminRequests = data.adminApprovalRequests || [];
        this.currentUser = data.currentUser || null;
        this.checkUserRoles();
      },
      error: (error) => console.error('Error loading requests:', error)
    });
  }

  checkUserRoles(): void {
    if (this.currentUser && this.currentUser.roles) {
      this.isOwner = this.currentUser.roles.includes('OWNER');
      this.isAdmin = this.currentUser.roles.includes('ADMIN');
    } else {
      this.isOwner = false;
      this.isAdmin = false;
    }
  }

  viewRequest(id: number): void {
    this.router.navigate(['/request-edit', id]);
  }

  approveRequest(requestId: number): void {
    if (confirm('Вы уверены, что хотите одобрить эту заявку?')) {
      this.dataService.approveRequest(requestId).subscribe({
        next: () => {
          alert('Заявка одобрена владельцем.');
          this.loadRequests();
        },
        error: (error) => console.error('Error approving request:', error)
      });
    }
  }

  rejectRequest(requestId: number): void {
    if (confirm('Вы уверены, что хотите отклонить эту заявку?')) {
      this.dataService.rejectRequest(requestId).subscribe({
        next: () => {
          alert('Заявка отклонена владельцем.');
          this.loadRequests();
        },
        error: (error) => console.error('Error rejecting request:', error)
      });
    }
  }

  adminApproveRequest(requestId: number): void {
    if (confirm('Вы уверены, что хотите ОДОБРИТЬ эту заявку как администратор?')) {
      this.dataService.adminApproveRequest(requestId).subscribe({
        next: () => {
          alert('Заявка одобрена администратором. Доступ предоставлен.');
          this.loadRequests();
        },
        error: (error) => console.error('Error approving request as admin:', error)
      });
    }
  }

  adminRejectRequest(requestId: number): void {
    if (confirm('Вы уверены, что хотите ОТКЛОНИТЬ эту заявку как администратор?')) {
      this.dataService.adminRejectRequest(requestId).subscribe({
        next: () => {
          alert('Заявка отклонена администратором.');
          this.loadRequests();
        },
        error: (error) => console.error('Error rejecting request as admin:', error)
      });
    }
  }
}
