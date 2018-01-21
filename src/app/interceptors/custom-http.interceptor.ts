import { Injectable, Inject, Injector, forwardRef } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AuthService } from '../auth.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(
    @Inject(forwardRef(() => Injector))
    private injector: Injector
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.debug('http request', req);
    return next
      .handle(req)
      .do(ev => {
        console.log('http response : ', ev);
      })
      .catch(response => {
        if (response instanceof HttpErrorResponse) {
          console.log('http error', response);
          if (response.status == 403) {
            this.injector.get(AuthService).logout();
          }
        }
        return Observable.throw(response);
      });
  }
}
