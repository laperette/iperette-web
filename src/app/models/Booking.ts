export class Booking {
  booker: Booker;
  createdAt: Date;
  endDate: Date;
  nbOfGuests: number;
  pending: boolean;
  status: string;
  startDate: Date;
  updatedAt: Date;
  _id: string;
}

export class Booker {
  color: string;
  firstname: string;
  lastname: string;
  _id: string;
}
