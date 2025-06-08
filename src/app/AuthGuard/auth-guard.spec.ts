import { TestBed } from '@angular/core/testing';
import { authGuard } from './auth-guard';
import { Router } from '@angular/router';

describe('authGuard', () => {
  let guard: authGuard;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        authGuard,
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(authGuard);
  });

  it('should allow access when user is logged in', () => {
    localStorage.setItem('currentUserEmail', 'test@example.com');
    expect(guard.canActivate()).toBeTrue();
  });

  it('should deny access and redirect when user is not logged in', () => {
    localStorage.removeItem('currentUserEmail');
    expect(guard.canActivate()).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
