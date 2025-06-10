import { Component, OnInit } from '@angular/core';
import { Auth } from '../AuthService/auth';
import {CommonModule} from '@angular/common'; 

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.css'
})

export class History implements OnInit{
  history: any[] = [];
  constructor(private authService:Auth){}
  ngOnInit() {
  const currentEmail = this.authService.getcurrentuseremail();
  if (!currentEmail) return;

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const currentUser = users.find((user: any) => user.email === currentEmail);

  this.history = currentUser?.history?.slice().reverse() || [];
}
clearHistory() {
  const currentEmail = this.authService.getcurrentuseremail();
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const userIndex = users.findIndex((u: any) => u.email === currentEmail);
  if (userIndex !== -1) {
    users[userIndex].history = [];
    localStorage.setItem('users', JSON.stringify(users));
    this.history = [];
  }
}


}
