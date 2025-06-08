import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {RouterLinkActive } from '@angular/router';
import { Auth } from '../AuthService/auth';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar  implements OnInit{
  logo='assets/images/logo.png'

  constructor(private authservice: Auth){}
  isLoggedIn = false;

ngOnInit() {
  this.authservice.IsLoggedIn$.subscribe((status=>{
    this.isLoggedIn=status;
  }));
}
logout(){
  this.authservice.logout();
}

}
