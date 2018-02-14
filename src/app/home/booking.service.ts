import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Booking, Booker, BookingToSubmit } from '../models/Booking';
import { isWithinRange } from 'date-fns';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoggerService } from '../logger.service';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class BookingService {
  private URL = environment.apiUrl + '/bookings';
  private _bookings: BehaviorSubject<Booking[]> = new BehaviorSubject<
    Booking[]
  >([]);
  private logger: NGXLogger;
  constructor(private http: HttpClient, loggerSvc: LoggerService) {
    this.logger = loggerSvc.create('BookingService');
  }

  get bookings(): Observable<Booking[]> {
    return this._bookings.asObservable();
  }
  get actualBookings(): Booking[] {
    return this._bookings.getValue();
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.URL).do((bookings: Booking[]) => {
      this.logger.debug('bookings received : ', bookings);
      this._bookings.next(bookings);
    });
  }

  createBooking(booking: Booking): Observable<Booking[]> {
    return this.http
      .post(this.URL + '/creer', new BookingToSubmit(booking))
      .flatMap(resp => this.getAllBookings());
  }

  cancelABooking(bookingId: number): Observable<Booking[]> {
    return this.http
      .delete<Booking[]>(this.URL + '/' + bookingId)
      .do((bookings: Booking[]) => {
        this._bookings.next(bookings);
      });
  }

  isAlreadyBooked(date: Date): boolean {
    return (
      this._bookings
        .getValue()
        .find(b => isWithinRange(date, b.startDate, b.endDate)) !== undefined
    );
  }
}
