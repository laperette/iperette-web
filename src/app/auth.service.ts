import { Injectable } from '@angular/core';
import { UserSignedIn, UserSignin, UserSignup } from './models/User';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private jwtSvc: JwtHelperService
  ) {}

  isLoggedIn(): boolean {
    return this.token && !this.jwtSvc.isTokenExpired(this.token);
  }

  get userRole(): string {
    if (this.token) {
      const decoded = this.jwtSvc.decodeToken(localStorage.getItem('token'));
      return decoded.role;
    }
    return null;
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  signin(user: UserSignin): Observable<boolean> {
    const url = environment.apiUrl + '/login';
    return this.http
      .post<HttpResponse<any>>(url, user, {
        observe: 'response'
      })
      .map(resp => {
        const token = this.getTokenFromHeaders(resp.headers);
        if (resp.status === 200 && token) {
          localStorage.setItem('token', token);
          return true;
        } else {
          return false;
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  signup(user: UserSignup): Observable<boolean> {
    let url = environment.apiUrl + '/users/sign-up';
    return this.http.post<any>(url, user).map(resp => {
      if (resp && resp.token) {
        localStorage.setItem('token', resp.token);
      }
      return resp.token ? true : false;
    });
  }

  private getTokenFromHeaders(headers: HttpHeaders): string {
    const authHeader = headers.get('authorization');
    if (authHeader) {
      const token = authHeader.split('Bearer ')[1];
      return token;
    } else {
      return null;
    }
  }
}
