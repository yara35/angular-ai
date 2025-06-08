import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private loggedin = new BehaviorSubject<boolean>(this.isloggedin());
   // Public observable
   IsLoggedIn$ = this.loggedin.asObservable();

  constructor() { }
   isloggedin():boolean{
    return !!localStorage.getItem('currentuser');
  }

  login(email:string):void{
    localStorage.setItem('currentuser', email)
    this.loggedin.next(true) //update observable
  }

  logout():void{
    localStorage.removeItem('currentuser');
    this.loggedin.next(false) //update observable
  }

  getcurrentuseremail():string | null{
    return localStorage.getItem('currentuser')
  }



}
