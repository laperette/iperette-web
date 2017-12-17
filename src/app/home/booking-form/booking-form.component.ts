import { Component, Injectable, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerI18nService, I18n } from './datepicker-i18n.service';
import { BookingService } from '../booking.service';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';

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
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: DatepickerI18nService }]
})
export class BookingFormComponent implements OnInit {
  model;
  hoveredDate: NgbDateStruct;

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  numOfParticipants: number;

  constructor(private calendar: NgbCalendar, private bookingSvc: BookingService) {
    this.fromDate = this.calendar.getToday();
    this.toDate = this.calendar.getNext(calendar.getToday(), 'd', 10);
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
    console.debug("booking : ", booking)
    this.bookingSvc.createBooking(booking).subscribe(
      resp => {
        console.debug(resp)
      }, err => {
        console.error("error creating booking", err)
      }
    )
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

}
