import { TestBed } from '@angular/core/testing';

import { PeriodsService } from './periods.service';

describe('PeriodsService', () => {
  let service: PeriodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
