import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-accesses',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './accesses.html',
  styleUrl: './accesses.css'
})
export class Accesses {}
