import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { DataService } from '../data.service';
import { AccessRequest } from '../models';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './requests.html',
  styleUrl: './requests.css'
})
export class Requests {
  requests: AccessRequest[] = [];
  ownerRequests: AccessRequest[] = [];
  adminRequests: AccessRequest[] = [];
  selectedStatus: string = '';

  constructor(private dataService: DataService) {
    this.loadRequests();
  }

  loadRequests() {
    this.dataService.getRequests().subscribe(data => {
      this.requests = data.requests || [];
      this.ownerRequests = data.ownerRequests || [];
      this.adminRequests = data.adminRequests || [];
    }, error => {
      console.error('Error loading requests', error);
    });
  }

  // Метод для безопасного получения последнего статуса
  getLastStatus(request: AccessRequest): string {
    if (!request.requestHistories || request.requestHistories.length === 0) {
      return 'N/A';
    }
    const lastHistory = request.requestHistories[request.requestHistories.length - 1];
    return lastHistory.status ? lastHistory.status.name : 'N/A';
  }
}

