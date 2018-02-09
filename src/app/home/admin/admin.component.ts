import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../models/User';
import { Booking } from '../../models/Booking';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private http: HttpClient) {}

  users: User[] = [];
  bookings: Booking[] = [];

  ngOnInit() {
    const url = environment.apiUrl;
    this.http.get<User[]>(url + '/users').subscribe(
      (res: any) => {
        this.users = res;
      },
      err => {
        console.error(err);
      }
    );
    this.http.get<Booking[]>(url + '/bookings').subscribe(
      resa => {
        this.bookings = resa;
      },
      err => {
        console.error(err);
      }
    );
  }
}
