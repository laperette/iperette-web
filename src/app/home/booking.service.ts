import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class BookingService {
  URL = environment.apiUrl + "/bookings";

  constructor(private http: HttpClient) { }

  getAllBookings(): Observable<any> {
    return this.http.get(this.URL);
  }

  createBooking(booking): Observable<any> {
    return this.http.post(this.URL, { booking })
  }
}
