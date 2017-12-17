import { TestBed, inject } from '@angular/core/testing';

import { DatepickerI18nService } from './datepicker-i18n.service';

describe('DatepickerI18nService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatepickerI18nService]
    });
  });

  it('should be created', inject([DatepickerI18nService], (service: DatepickerI18nService) => {
    expect(service).toBeTruthy();
  }));
});
