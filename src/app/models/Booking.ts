export class Booking {
    booker: Booker;
    createdAt: Date;
    end: Date;
    numOfParticipants: Number;
    pending: boolean;
    start: Date;
    updatedAt: Date;
    _id: string
}

export class Booker {
    color: string;
    firstname: string;
    lastname: string;
    _id: string
}