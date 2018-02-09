import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Booking, Booker } from '../models/Booking';
import { isWithinRange } from 'date-fns';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class BookingService {
  private URL = environment.apiUrl + '/bookings';
  private _bookings: BehaviorSubject<Booking[]> = new BehaviorSubject<
    Booking[]
  >([]);

  constructor(private http: HttpClient) {}

  getBookings(): Booking[] {
    return this._bookings.getValue();
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.URL).do((bookings: Booking[]) => {
      this._bookings.next(bookings);
    });
  }

  createBooking(booking: Booking): Observable<Booking[]> {
    return this.http
      .post(this.URL + '/creer', booking)
      .flatMap(resp => this.getAllBookings());
  }

  isAlreadyBooked(date: Date): boolean {
    return (
      this._bookings
        .getValue()
        .find(b => isWithinRange(date, b.startDate, b.endDate)) != undefined
    );
  }
}
