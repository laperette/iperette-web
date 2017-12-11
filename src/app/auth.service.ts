import { Injectable } from '@angular/core';
import { UserSignedIn } from './models/User';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(private router: Router) { }
  isLoggedIn(): boolean {
    return (localStorage.getItem('token') && localStorage.getItem('user')) ? true : false
  };
  login(user: UserSignedIn) {
    localStorage.setItem('token', user.token)
    localStorage.setItem('user', JSON.stringify(user))
    this.router.navigate(['/home']);
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.router.navigate(['/']);
  }
}
