export class Booking {
  booker: Booker;
  createdAt: Date;
  endDate: Date;
  nbOfGuests: number;
  status: BookingStatus;
  startDate: Date;
  updatedAt: Date;
  id: number;

  constructor() {
    // default value for status :
    this.status = BookingStatus.PENDING;
  }
}

export class Booker {
  color: string;
  firstname: string;
  lastname: string;
  email: string;
  _id: string;
}

export enum BookingStatus {
  PENDING,
  CANCELED,
  ACCEPTED
}

export class BookingToSubmit {
  id: number;
  startDate: string;
  endDate: string;
  nbOfGuests: number;
  status: BookingStatus;
  constructor(booking: Booking) {
    this.id = booking.id;
    this.startDate = booking.startDate.toISOString();
    this.endDate = booking.endDate.toISOString();
    this.nbOfGuests = booking.nbOfGuests;
    this.status = booking.status;
  }
}
