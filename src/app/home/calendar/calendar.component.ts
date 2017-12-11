import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/debounceTime'
import { BookingService } from '../booking.service'

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
  events$: Observable<Array<CalendarEvent<any>>>;

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
    this.events$ = this.bookingService.getAllBookings().debounceTime(2000).map((resp) => {
      console.log('bookings fetched : ', resp.bookings)
      if (resp.bookings) {
        return resp.bookings.map((val) => {
          console.log(new Date(val.end))
          return {
            title: val.booker.firstname + ' ' + val.booker.lastname,
            start: new Date(val.start),
            end: new Date(val.end),
            color: { primary: val.booker.color },
            meta: { val }
          }
        })
      } else {
        return []
      }
    })
  }
}