import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AlertService } from '../alerts/alert.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private alertSvc: AlertService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.debug('interceptig a request', req)
    let token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req)
      .do(ev => {
        if (ev instanceof HttpResponse) {
          console.log('processing response', ev);
        }
      })
      .catch(response => {
        if (response instanceof HttpErrorResponse) {
          console.log('Processing http error', response);
          this.alertSvc.error(response.error);
        }
        return Observable.throw(response);
      });;
  }
}