import { TestBed } from '@angular/core/testing';

import { ContractRenovationService } from './contract-renovation.service';

describe('ContractRenovationService', () => {
  let service: ContractRenovationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractRenovationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
