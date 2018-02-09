import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../models/User';
import { Booking } from '../../models/Booking';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private http: HttpClient) {}

  user: User;
  bookings: Booking[];
  ngOnInit() {
    const url = environment.apiUrl;
    this.http.get<User>(url + '/users/me').subscribe(
      usr => {
        this.user = usr;
        console.log(usr);
      },
      err => {
        console.error(err);
      }
    );
    this.http.get<Booking[]>(url + '/bookings/me').subscribe(
      resa => {
        this.bookings = resa;
        console.log(resa);
      },
      err => {
        console.error(err);
      }
    );
  }
}
