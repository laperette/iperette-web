import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { BookingService } from '../booking.service';
import { Booking } from '../../models/Booking';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClickedDayModalContentComponent } from './clicked-day-modal-content.component';

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
  constructor(
    private bookingService: BookingService,
    private modal: NgbModal
  ) {}
  locale = 'fr';
  activeDayIsOpen: boolean;
  view = 'month';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  viewDate: Date = new Date();
  events$: Observable<CalendarEvent<Booking>[]>;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    const modalRef = this.modal.open(ClickedDayModalContentComponent, {
      size: 'lg'
    });
    date.setHours(12);
    modalRef.componentInstance.startDate = date;
    modalRef.componentInstance.events = events;
  }

  ngOnInit() {
    this.events$ = this.bookingService.bookings.pipe(
      map(bookings => {
        return bookings.map(booking => {
          return {
            title: this.bookingTitle(booking),
            start: new Date(booking.startDate),
            end: new Date(booking.endDate),
            color: {
              primary: booking.booker.color,
              secondary: booking.booker.color
            },
            meta: booking
          };
        });
      })
    );
    this.bookingService.getAllBookings().subscribe();
  }

  private bookingTitle(booking: Booking): string {
    const start = new Date(booking.startDate).toLocaleDateString();
    const end = new Date(booking.endDate).toLocaleDateString();
    const title = `${this.capitalizeFirstLetter(
      booking.booker.firstname
    )} ${this.capitalizeFirstLetter(
      booking.booker.lastname
    )}, du ${start} au ${end} (${booking.nbOfGuests} invités).`;
    return title;
  }

  private capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }
}
