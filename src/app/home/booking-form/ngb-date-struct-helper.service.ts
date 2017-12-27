import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NgbDateStructHelperService {

    fromNativeDate(date: Date): NgbDateStruct {
        return (date && date.getFullYear) ? { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } : null;
    }

    toNativeDate(date: NgbDateStruct): Date {
        return date ? new Date(Date.UTC(date.year, date.month - 1, date.day)) : null;
    }
}