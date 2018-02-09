import { TestBed, inject } from '@angular/core/testing';

import { CustomHttpInterceptor } from './http.interceptor';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomHttpInterceptor]
    });
  });

  it(
    'should be created',
    inject([CustomHttpInterceptor], (service: CustomHttpInterceptor) => {
      expect(service).toBeTruthy();
    })
  );
});
