import { Component, OnInit, Input } from '@angular/core';
import { Booking } from '../../models/Booking';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  @Input() bookings: Booking[];
  constructor() {}
  ngOnInit() {}
}
