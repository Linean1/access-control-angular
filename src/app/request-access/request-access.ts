import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-request-access',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './request-access.html',
  styleUrl: './request-access.css'
})
export class RequestAccess {}
