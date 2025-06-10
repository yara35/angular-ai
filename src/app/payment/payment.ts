import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Auth } from '../AuthService/auth';

declare const paypal: any;

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css']
})
export class PaymentComponent implements AfterViewInit {
  plan = '';

  constructor(private route: ActivatedRoute, private router: Router, private auth:Auth) {
    this.route.queryParams.subscribe(params => {
      this.plan = params['plan'] || 'monthly';
    });
  }

  ngAfterViewInit(): void {
    if (typeof paypal !== 'undefined') {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.getPrice(this.plan)
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            alert(`Payment completed by ${details.payer.name.given_name}!`);

            //Get current user
            const email = this.auth.getcurrentuseremail(); 
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const index = users.findIndex((u: any) => u.email === email);

            if (index !== -1) {
              users[index].subscribed = true;
              localStorage.setItem('users', JSON.stringify(users));
            }

            this.router.navigate(['/aiform']);
          });
        },
        onError: (err: any) => {
          console.error('PayPal Error:', err);
          alert('Payment failed. Please try again.');
        }
      }).render('#paypal-button-container');
    }
  }

  getPrice(plan: string): string {
    switch (plan) {
      case 'monthly': return '10.00';
      case 'annually': return '99.00';
      default: return '0.00';
    }
  }
}
