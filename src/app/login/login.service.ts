import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserSignup, UserSignin } from '../models/User';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  signup(user: UserSignup) {
    let url = environment.apiUrl + '/users'
    console.log('signup', url)
    return this.http.post(url, { user })
  }

  signin(user: UserSignin) {
    let url = environment.apiUrl + '/users/login'
    console.log('signin', url)
    return this.http.post(url, { user })
  }
}
