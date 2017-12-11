import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class BookingService {

  constructor(private http: HttpClient) { }
  getAllBookings(): Observable<any> {
    let url = environment.apiUrl + "/bookings";
    return this.http.get(url);
  }
}
