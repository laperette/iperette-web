import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators/map';
import { BookingService } from '../booking.service'
import { Booking } from '../../models/Booking';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewDay,
  DAYS_OF_WEEK
} from 'angular-calendar';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {
  constructor(private bookingService: BookingService) { }
  locale: string = 'fr';
  view: string = 'month';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  viewDate: Date = new Date();
  events$: Observable<CalendarEvent<Booking>[]>;

  handleEvent(action: string, event: CalendarEvent): void { }
  activeDayIsOpen: boolean = false;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      day.badgeTotal = day.events.filter(
        event => event.meta.incrementsBadgeTotal
      ).length;
    });
  }

  ngOnInit() {
    this.events$ = this.bookingService.getAllBookings().pipe(
      map(bookings => {
        return bookings.map(booking => {
          return {
            title: this.bookingTitle(booking),
            start: new Date(booking.start),
            end: new Date(booking.end),
            color: { primary: booking.booker.color, secondary: booking.booker.color },
            meta: booking
          }
        });
      })
    );
  }
  private bookingTitle(booking) {
    let title = this.capitalizeFirstLetter(booking.booker.firstname) + ' ' + this.capitalizeFirstLetter(booking.booker.lastname);
    let start = new Date(booking.start).toLocaleDateString();
    let end = new Date(booking.end).toLocaleDateString();
    title += ' - ' + booking.numOfParticipants + ' invités';
    title += ' - Du ' + start + ' au ' + end;
    return title;
  }
  private capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }
}