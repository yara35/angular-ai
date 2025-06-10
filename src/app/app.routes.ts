import { Routes } from '@angular/router';
import { Signup } from './signup/signup';
import { authGuard } from './AuthGuard/auth-guard';
import {Notfoundpage} from './notfoundpage/notfoundpage'
import { HomeComponent } from './home/home';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path: 'Login',loadComponent: () =>import('./login/login').then((c) => c.Login),},
    {path:'signup', component: Signup},
    {path: 'aiform',loadComponent: () =>import('./aiform/aiform').then((c) => c.Aiform),canActivate:[authGuard]},
    {path: 'history',loadComponent: () =>import('./history/history').then((c) => c.History),canActivate:[authGuard]},
    {path: 'packages',loadComponent: () =>import('./packages/packages').then((c) => c.PackagesComponent),canActivate:[authGuard]},
    {path: 'payment',loadComponent: () =>import('./payment/payment').then((c) => c.PaymentComponent),canActivate:[authGuard]},
    {path:'**', component: Notfoundpage}

];
