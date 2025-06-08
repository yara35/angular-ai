import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Aiform } from './aiform/aiform';
import { authGuard } from './AuthGuard/auth-guard';
import {Notfoundpage} from './notfoundpage/notfoundpage'

export const routes: Routes = [
    {path:'', component: Login},
    {path:'signup', component: Signup},
    {path:'aiform', component: Aiform, canActivate:[authGuard]},
    {path:'**', component: Notfoundpage}

];
