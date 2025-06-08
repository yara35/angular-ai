import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { Router ,RouterLink} from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})

export class Signup {
  signupForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private router: Router){
    this.signupForm = this.formBuilder.group({
      firstname: ['',[Validators.required, Validators.minLength(3)]],
      lastname: ['',[Validators.required, Validators.minLength(3)]],
      email: ['', Validators.email],
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', Validators.required]
    }, {validators:this.matchpass});
   
  };// end of constructor

   get FormControls(){
      return this.signupForm.controls;
    }
    matchpass(form: FormGroup){
      return form.get('password')?.value === form.get('confirmpassword')?.value?null : {mismatch: true};
    }


  onsubmit() {
    if (this.signupForm.valid) {
      const newUser = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        history: [] 
      };

      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');      

      const userExists = existingUsers.some((user: any) => user.email === newUser.email);

      if (userExists) {
        alert('This email is already registered');
        return;
      }

      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      this.router.navigate(['/']);
    }
}

}

