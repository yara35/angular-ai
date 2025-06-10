import { Injectable } from '@angular/core';
import {CanActivate , Router} from '@angular/router';
import { Auth } from '../AuthService/auth';
@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate {

  constructor(private router:Router, private authservice:Auth){}
  canActivate():boolean {
    if(this.authservice.isloggedin()){
      return true;
    }else{
      this.router.navigate(['/Login']);
      alert("login first!");
      return false;
    }
    
  }
};
