import { Injectable } from '@angular/core';
import { UserSignedIn, UserSignin, UserSignup, User } from './models/User';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NGXLogger } from 'ngx-logger';
import { LoggerService } from './logger.service';

export function getToken(): string {
  return localStorage.getItem('token');
}

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private jwtSvc: JwtHelperService,
    private loggerService: LoggerService
  ) {
    this.logger = this.loggerService.create('AuthService');
  }
  private logger: NGXLogger;
  private _user: BehaviorSubject<User> = new BehaviorSubject(null);

  isLoggedIn(): boolean {
    return this.token && !this.jwtSvc.isTokenExpired(this.token);
  }
  get user(): Observable<User> {
    return this._user.asObservable();
  }
  get userRole(): string {
    if (this.token) {
      const decoded = this.jwtSvc.decodeToken(this.token);
      return decoded.role;
    }
    return null;
  }

  get token(): string {
    return getToken();
  }

  signin(user: UserSignin): Observable<boolean> {
    console.log('signin : ', user);
    const url = environment.apiUrl + '/login';
    return this.http
      .post<HttpResponse<any>>(url, user, {
        observe: 'response'
      })
      .map(resp => {
        console.log('signinresp : ', resp);
        const token = this.getTokenFromHeaders(resp.headers);
        if (resp.status === 200 && token) {
          localStorage.setItem('token', token);
        } else {
          this.logger.error('unable to sign in : ', resp);
        }
        return token ? true : false;
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  signup(user: UserSignup): Observable<boolean> {
    const url = environment.apiUrl + '/users/sign-up';
    return this.http.post<any>(url, user).map(resp => {
      if (resp && resp.token) {
        localStorage.setItem('token', resp.token);
      } else {
        this.logger.error('unable to sign up : ', resp);
      }
      return resp.token ? true : false;
    });
  }

  logUser() {
    const url = environment.apiUrl + '/users/me';
    this.http.get<User>(url).subscribe(
      usr => {
        this._user.next(usr);
        this.logger.debug('logged user : ', usr);
      },
      err => {
        this.logger.error('error in logUser : ', err);
      }
    );
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
