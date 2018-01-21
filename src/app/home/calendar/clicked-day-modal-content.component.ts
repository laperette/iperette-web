import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from '../booking.service';
import { Booking } from '../../models/Booking';
@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
    <h5 *ngIf="events?.length <= 0" class="modal-title">Réserver du {{ startDate | date: 'dd/MM/yyyy' }} au {{endDate | date: 'dd/MM/yyyy'}}</h5>
    <h5 *ngIf="events?.length == 1" class="modal-title">Une réservation existe déjà à cette date</h5>
    <h5 *ngIf="events?.length > 1" class="modal-title">Plusieurs réservations existent déjà à cette date</h5>
    <button type="button" class="close" (click)="activeModal.close()">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
  <ngb-alert [dismissible]="false" *ngIf="events?.length > 0" [type]="'danger'">
    <p *ngFor="let event of events">{{ event.title }}</p>
  </ngb-alert>
  <div *ngIf="events?.length <= 0">
    <form>
      <app-booking-form [startDate]="startDate" (endDate)="getEndDate($event)"></app-booking-form>
      <div class="form-group">
        <label for="numOfParticipants">Nombre de personnes</label>
        <input id="numOfParticipants" class="form-control" name="numOfParticipants" [(ngModel)]="numOfParticipants" placeholder="Nombre de participants">
      </div>
    </form>
    <div class="modal-footer justify-content">
      <p>Réservation du {{ startDate | date: 'dd/MM/yyyy' }} au {{endDate | date: 'dd/MM/yyyy'}}</p>
      <button type="button" class="btn btn-outline-primary" [disabled]="loading" (click)="onSubmit()">Je réserve !</button>
    </div>
  </div>
  `
})
export class ClickedDayModalContent {
  @Input() startDate: Date;
  @Input() events;
  @Output() newEndDateChosen: EventEmitter<Date> = new EventEmitter<Date>();
  endDate: Date;
  numOfParticipants: number;
  loading: boolean = false;

  getEndDate(endDate: Date) {
    this.endDate = endDate;
    this.newEndDateChosen.emit(endDate);
  }

  onSubmit() {
    const booking = new Booking();
    booking.startDate = this.startDate;
    booking.endDate = this.endDate;
    booking.nbOfGuests = this.numOfParticipants;
    this.loading = true;
    this.bookingSvc.createBooking(booking).subscribe(
      resp => {
        this.loading = false;
        this.activeModal.close();
      },
      err => {
        this.loading = false;
      }
    );
  }

  constructor(
    public activeModal: NgbActiveModal,
    private bookingSvc: BookingService
  ) {}
}
