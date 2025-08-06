import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { DataService } from '../services/data.service';
import { AccessRequest } from '../models';

@Component({
  selector: 'app-accesses',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterModule,
    MatTableModule,
    MatCardModule
  ],
  templateUrl: './accesses.html',
  styleUrl: './accesses.css'
})
export class Accesses implements OnInit {
  accesses: AccessRequest[] = [];
  displayedColumns: string[] = ['id', 'service', 'role'];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadAccesses();
  }

  loadAccesses(): void {
    this.dataService.getAccesses().subscribe({
      next: (data) => {
        this.accesses = data;
        console.log('Loaded accesses:', this.accesses);
      },
      error: (error) => {
        console.error('Error loading accesses:', error);
      }
    });
  }
}
