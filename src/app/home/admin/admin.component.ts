import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../models/User';
import { Booking } from '../../models/Booking';
import { NGXLogger } from 'ngx-logger';
import { LoggerService } from '../../logger.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private http: HttpClient, private loggerService: LoggerService) {
    this.logger = this.loggerService.create('AdminComponent');
  }
  private logger: NGXLogger;
  users: User[] = [];
  bookings: Booking[] = [];

  ngOnInit() {
    const url = environment.apiUrl;
    this.http.get<User[]>(url + '/users').subscribe(
      (res: any) => {
        this.users = res;
      },
      err => {
        this.logger.error(err);
      }
    );
    this.http.get<Booking[]>(url + '/bookings').subscribe(
      resa => {
        this.bookings = resa;
      },
      err => {
        this.logger.error(err);
      }
    );
  }
}
