import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router , RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../AuthService/auth';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm!:FormGroup;
  errorMessage: string = '';
  showError: boolean = false;


  constructor(private router: Router, private formbuilder : FormBuilder, private authservice: Auth){
    this.loginForm = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
  }
  get f(){
    return this.loginForm.controls;
  }
  // loginForm = new FormGroup({
  //   name: new FormControl('', Validators.required),
  //   email: new FormControl('', Validators.email)
  // })

  

  onsubmit(){
    console.log(this.loginForm.value);
    if(this.loginForm.valid){
      const Existingusers = JSON.parse(localStorage.getItem('users')|| '[]')
      const inputemail = this.loginForm.value.email;
      const inputpass = this.loginForm.value.password;

      if (Existingusers.length === 0) {
        alert('Please sign up first.');
        return;
      }
      const founduser = Existingusers.find((user:any)=> user.email === inputemail && user.password === inputpass);
      if(founduser){
        this.authservice.login(founduser.email)
        // localStorage.setItem('currentuser',JSON.stringify(founduser) );        
        this.router.navigate(['/aiform']);
      }
      else{
        this.showErrorMessage('Email or password is incorrect, or you are not signed up.');
      }
      //  else if(Existingusers.find((user:any)=> user.email != inputemail && user.password != inputpass)){
      //   this.errorMessage = 'You are not signed up.';
      // }
    }
  }
     showErrorMessage(message: string) {
        this.errorMessage = message;
        this.showError = true;

        setTimeout(() => {
          this.showError = false;
        }, 3000); 
      }
}
