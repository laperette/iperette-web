import { Component, OnInit, Input } from '@angular/core';
import { Booking } from '../../models/Booking';

@Component({
  selector: 'app-booking-actions',
  templateUrl: './booking-actions.component.html',
  styleUrls: ['./booking-actions.component.css']
})
export class BookingActionsComponent implements OnInit {
  @Input() booking: Booking;
  constructor() {}

  ngOnInit() {}

  annuler() {}
  modifier() {}
}
