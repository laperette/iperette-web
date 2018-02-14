import {
  Component,
  Injectable,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { BookingService } from '../booking.service';
import { Booking, BookingStatus } from '../../models/Booking';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import {
  NgbDateAdapter,
  NgbDateStruct,
  NgbDatepickerI18n
} from '@ng-bootstrap/ng-bootstrap';
import {
  I18n,
  DatepickerI18nService,
  NgbDateNativeAdapter
} from './datepicker-i18n.service';
import { isBefore, isAfter } from 'date-fns';
import { NGXLogger } from 'ngx-logger';
import { LoggerService } from '../../logger.service';
import { distanceInWords, isWithinRange } from 'date-fns';
import * as frLocale from 'date-fns/locale/fr/index.js';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    I18n,
    { provide: NgbDatepickerI18n, useClass: DatepickerI18nService }
  ]
})
export class BookingFormComponent implements OnInit {
  bookingValue: Booking;
  @Input()
  get booking(): Booking {
    return this.bookingValue;
  }
  @Output() bookingChange = new EventEmitter<Booking>();

  set booking(booking: Booking) {
    this.bookingValue = booking;
    this.bookingChange.emit(this.bookingValue);
  }
  @Input() full: boolean; // true if we want to display checkbox for the status choice
  @Input() submitButton: TemplateRef<any>;
  @Output() newBooking: EventEmitter<Booking> = new EventEmitter<Booking>();
  @Output() submitted: EventEmitter<boolean> = new EventEmitter<boolean>();

  bookingStatus = BookingStatus;
  bookingForm: FormGroup;

  get startDate(): AbstractControl {
    return this.bookingForm.get('startDate');
  }
  get endDate(): AbstractControl {
    return this.bookingForm.get('endDate');
  }
  get nbOfGuests(): AbstractControl {
    return this.bookingForm.get('nbOfGuests');
  }
  get status(): AbstractControl {
    return this.bookingForm.get('status');
  }
  get duration(): string {
    return distanceInWords(this.startDate.value, this.endDate.value, {
      locale: frLocale
    });
  }

  minDate = new Date();
  private logger: NGXLogger;
  constructor(
    private bookingSvc: BookingService,
    private formBuilder: FormBuilder,
    private dateAdapter: NgbDateAdapter<Date>,
    private bookingService: BookingService,
    private loggerService: LoggerService
  ) {
    this.logger = this.loggerService.create('BookingFormComponent');
  }

  ngOnInit() {
    this.bookingForm = this.formBuilder.group(
      {
        startDate: [this.booking.startDate, [Validators.required]],
        endDate: [this.booking.endDate, [Validators.required]],
        nbOfGuests: [
          this.booking.nbOfGuests,
          [Validators.required, Validators.max(20)]
        ],
        status: [this.booking.status, Validators.required]
      },
      { validator: this.dateChoiceValidator.bind(this) }
    );
    this.bookingForm.valueChanges.subscribe(changed => {
      this.booking.startDate = this.startDate.value;
      this.booking.endDate = this.endDate.value;
      this.booking.nbOfGuests = this.nbOfGuests.value;
      this.booking.status = this.status.value;
      if (this.bookingForm.valid) {
        this.newBooking.emit(this.booking);
      }
    });
  }

  isDisabledForStartDate = (date: Date) => {
    return (
      (this.booking.endDate && isAfter(date, this.booking.endDate)) ||
      this.bookingService.actualBookings
        .filter(b => this.booking.id !== b.id)
        .some(b => isWithinRange(date, b.startDate, b.endDate)) ||
      isBefore(date, new Date())
    );
  };
  isDisabledForEndDate = (date: Date) => {
    return (
      (this.booking.startDate && isBefore(date, this.booking.startDate)) ||
      this.bookingService.actualBookings
        .filter(b => this.booking.id !== b.id)
        .some(b => isWithinRange(date, b.startDate, b.endDate)) ||
      isBefore(date, new Date())
    );
  };

  private dateChoiceValidator(
    control: AbstractControl
  ): { [key: string]: boolean } {
    const start = control.get('startDate').value;
    const end = control.get('endDate').value;
    if (!start || !end) {
      return null;
    }
    if (isBefore(end, start)) {
      return { endBeforeStart: true };
    }
    if (this.full) {
      return null;
    }
    return this.bookingService.actualBookings.some(b => {
      if (this.full && this.booking.id === b.id) {
        return false;
      }
      return (
        isWithinRange(b.startDate, start, end) ||
        isWithinRange(b.endDate, start, end)
      );
    })
      ? { alreadyBookedDates: true }
      : null;
  }
  getColorForDate(date: Date): any {
    let color: string;
    this.bookingService.actualBookings.some(b => {
      if (isWithinRange(date, b.startDate, b.endDate)) {
        color = b.booker.color;
        return true;
      }
      return false;
    });
    return color;
  }
}
