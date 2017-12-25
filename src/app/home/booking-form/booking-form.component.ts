import { Component, Injectable, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerI18nService, I18n } from './datepicker-i18n.service';
import { BookingService } from '../booking.service';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
  providers: [I18n, NgbDatepickerConfig, { provide: NgbDatepickerI18n, useClass: DatepickerI18nService }]
})
export class BookingFormComponent implements OnInit {
  model;
  hoveredDate: NgbDateStruct;

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  numOfParticipants: number;

  constructor(private calendar: NgbCalendar, private bookingSvc: BookingService, config: NgbDatepickerConfig) {
    this.fromDate = this.calendar.getToday();
    this.toDate = this.fromDate;//this.calendar.getNext(calendar.getToday(), 'd', 10);
    // days that don't belong to current month are not visible
    config.outsideDays = 'hidden';
  }

  ngOnInit() {
  }

  toNativeDate(date: NgbDateStruct): Date {
    return date ? new Date(Date.UTC(date.year, date.month - 1, date.day)) : null;
  }

  onDateChange(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  onSubmit() {
    let booking = {
      start: this.toNativeDate(this.fromDate),
      end: this.toNativeDate(this.toDate),
      numOfParticipants: this.numOfParticipants
    }
    this.bookingSvc.createBooking(booking).subscribe(resp => {
      console.debug(resp)
    })
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);
  isBeforeToday = date => before(date, this.calendar.getToday());
  isBooked = date => this.bookingSvc.isAlreadyBooked(this.toNativeDate(date));
}
