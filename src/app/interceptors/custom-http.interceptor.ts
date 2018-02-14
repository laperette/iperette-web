import { Injectable, Inject, Injector, forwardRef } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import { AuthService } from '../auth.service';
import { NGXLogger } from 'ngx-logger';
import { LoggerService } from '../logger.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(
    @Inject(forwardRef(() => Injector))
    private injector: Injector
  ) {}
  private _logger: NGXLogger;
  get logger(): NGXLogger {
    if (!this._logger) {
      this._logger = this.injector
        .get(LoggerService)
        .create('CustomHttpInterceptor');
    }
    return this._logger;
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.responseType !== 'json') {
      return next.handle(req);
    }
    // convert to responseType of text to skip angular parsing
    req = req.clone({
      responseType: 'text'
    });
    if (req.body) {
      this.logger.trace(
        `POST request for ${req.urlWithParams} with body :`,
        req.body
      );
    }
    const started = Date.now();
    return next
      .handle(req)
      .pipe(
        map(resp => {
          if (resp instanceof HttpResponse) {
            const elapsed = Date.now() - started;
            this.logger.trace(
              `Request for ${req.urlWithParams} took ${elapsed} ms.`
            );
            if (resp.body) {
              resp = resp.clone({
                body: JSON.parse(resp.body, this.reviver.bind(this))
              });
            }
          }
          return resp;
        })
      )
      .catch(response => {
        if (response instanceof HttpErrorResponse) {
          this.logger.error('http error', response);
          if (response.status === 403) {
            this.injector.get(AuthService).logout();
          }
        }
        return _throw(response);
      });
  }
  private reviver(key: string, value: any): any {
    if (value !== null && (key === 'startDate' || key === 'endDate')) {
      return new Date(value);
    }
    return value;
  }
}
