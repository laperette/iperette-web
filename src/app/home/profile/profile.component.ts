import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../models/User';
import { Booking } from '../../models/Booking';
import { AuthService } from '../../auth.service';
import { Observable } from 'rxjs/observable';
import { NGXLogger } from 'ngx-logger';
import { LoggerService } from '../../logger.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private loggerService: LoggerService
  ) {
    this.logger = this.loggerService.create('ProfileComponent');
  }
  private logger: NGXLogger;

  user: Observable<User>;
  bookings: Booking[];
  ngOnInit() {
    const url = environment.apiUrl;
    this.user = this.authService.user;

    this.http.get<Booking[]>(url + '/bookings/me').subscribe(
      resa => {
        this.bookings = resa;
        this.logger.debug(resa);
      },
      err => {
        this.logger.error(err);
      }
    );
  }
}
