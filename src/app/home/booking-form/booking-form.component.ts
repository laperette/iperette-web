import { Component, Injectable, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerI18nService, I18n } from './datepicker-i18n.service';
import { BookingService } from '../booking.service';
import { NgbDateStructHelperService } from './ngb-date-struct-helper.service';

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
  providers: [
    I18n,
    NgbDatepickerConfig,
    { provide: NgbDatepickerI18n, useClass: DatepickerI18nService },
    NgbDateStructHelperService
  ]
})
export class BookingFormComponent implements OnInit {
  @Input() startDate: Date;
  @Output() endDate: EventEmitter<Date> = new EventEmitter<Date>();
  hoveredDate: NgbDateStruct;
  date: NgbDateStruct;
  minDate: NgbDateStruct;

  constructor(
    private calendar: NgbCalendar,
    private bookingSvc: BookingService,
    config: NgbDatepickerConfig,
    private ngbDateHelper: NgbDateStructHelperService
  ) {
    config.outsideDays = 'hidden';
  }

  ngOnInit() {
    this.date = this.ngbDateHelper.fromNativeDate(this.startDate);
    this.minDate = this.date;
  }

  onDateChange(date: NgbDateStruct) {
    this.endDate.emit(this.ngbDateHelper.toNativeDate(date));
  }
  isHovered = date => equals(date, this.hoveredDate);
  isBeforeToday = date => before(date, this.calendar.getToday());
  isBooked = date => this.bookingSvc.isAlreadyBooked(this.ngbDateHelper.toNativeDate(date));
}
