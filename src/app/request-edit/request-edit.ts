import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-request-edit',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './request-edit.html',
  styleUrl: './request-edit.css'
})
export class RequestEdit {}
