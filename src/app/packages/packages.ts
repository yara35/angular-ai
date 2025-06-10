import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-packages',
  imports: [CommonModule, RouterModule],
  templateUrl: './packages.html',
  styleUrls: ['./packages.css']
})
export class PackagesComponent {
  constructor(private router: Router) {}

  choosePlan(plan: string) {
    if (plan === 'free') {
      this.router.navigate(['/aiform']);
    } else {
      this.router.navigate(['/payment'], { queryParams: { plan } });
    }
  }
}
