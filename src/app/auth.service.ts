import { Injectable } from '@angular/core';
import { UserSignedIn } from './models/User';

@Injectable()
export class AuthService {
  constructor() { }
  isLoggedIn(): boolean {
    return (localStorage.getItem('token') && localStorage.getItem('user')) ? true : false
  };
  login(user: UserSignedIn) {
    localStorage.setItem('token', user.token)
    localStorage.setItem('user', JSON.stringify(user))
  }
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}
