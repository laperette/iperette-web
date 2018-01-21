import {
  Component,
  Injectable,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { BookingService } from '../booking.service';
import { Booking } from '../../models/Booking';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  @Input() startDate: Date; // populated if it is a new booking
  @Input() booking: Booking; // populated if it is a modification
  @Input() full: boolean; // true if we want to display checkbox for the status choice

  @Output() newBooking: EventEmitter<Booking> = new EventEmitter<Booking>();
  @Output() submited: EventEmitter<boolean> = new EventEmitter<boolean>();

  bookingForm: FormGroup;
  minDate = new Date();

  constructor(
    private bookingSvc: BookingService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.startDate) {
      this.startDate.setHours(0, 0, 0, 0);
    }
    const startDateStr = this.startDate
      ? this.startDate.toISOString()
      : this.booking.startDate;
    const endDateStr = this.booking ? this.booking.endDate : '';
    const nbOfGuests = this.booking ? this.booking.nbOfGuests : '';
    const actualStatus = this.booking ? this.booking.status : '';
    this.bookingForm = this.formBuilder.group({
      startDate: [startDateStr, [Validators.required]],
      endDate: [endDateStr, [Validators.required]],
      nbOfGuests: [nbOfGuests, [Validators.required, Validators.max(20)]],
      status: [actualStatus, Validators.required]
    });
    this.bookingForm.valueChanges.subscribe(changed => {
      this.newBooking.emit(this.bookingForm.value as Booking);
    });
  }

  submit() {
    this.newBooking.emit(this.bookingForm.value as Booking);
    this.submited.emit(true);
  }
}
