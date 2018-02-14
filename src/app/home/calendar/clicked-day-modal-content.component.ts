import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  TemplateRef
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from '../booking.service';
import { Booking } from '../../models/Booking';
import { distanceInWords } from 'date-fns';
import * as frLocale from 'date-fns/locale/fr/index.js';

@Component({
  selector: 'app-clicked-day-modal-content',
  template: `
      <ng-container *ngIf="events?.length <= 0; else hasResa">
        <div class="modal-header">
          <h5 class="modal-title">Nouvelle réservation</h5>
        </div>
        <div class="modal-body">
          <app-booking-form [(booking)]="newBooking" [submitButton]="submitButton"></app-booking-form>
        </div>
      </ng-container>

      <ng-template #hasResa>
      <div class="modal-header">
        <h5 class="modal-title">Détail de la réservation : </h5>
      </div>
      <div class="modal-body">
        <ngb-alert [dismissible]="false" [type]="'danger'">
          <p *ngFor="let event of events">{{ event.title }}</p>
        </ngb-alert>
      </div>
    </ng-template>

      <ng-template #submitButton let-valid="valid">
        <app-button-spinner (click)="onSubmit()" [loading]="isLoading" [disabled]="!valid" [btnClass]="'btn-outline-primary'">
          Je réserve !
        </app-button-spinner>
      <ng-template>
  `
})
export class ClickedDayModalContentComponent implements OnInit {
  @Input() startDate: Date;
  @Input() events;
  isLoading = false;
  newBooking: Booking = new Booking();
  hasResa: TemplateRef<any>;
  constructor(
    public activeModal: NgbActiveModal,
    private bookingSvc: BookingService
  ) {}

  ngOnInit() {
    this.newBooking.startDate = this.startDate;
    console.log(this.events);
  }

  onSubmit() {
    this.isLoading = true;
    this.bookingSvc.createBooking(this.newBooking).subscribe(
      resp => {
        this.isLoading = false;
        this.activeModal.close();
      },
      err => {
        this.isLoading = false;
      }
    );
  }
}
