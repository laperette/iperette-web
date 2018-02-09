import { Component, OnInit, Input } from '@angular/core';
import { Booking } from '../../models/Booking';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-booking-actions',
  templateUrl: './booking-actions.component.html',
  styleUrls: ['./booking-actions.component.css']
})
export class BookingActionsComponent implements OnInit {
  @Input() booking: Booking;
  @Input() full: boolean;
  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  annuler() {}
  modifier() {}

  open(content) {
    this.modalService.open(content);
  }
}
