import { TestBed } from '@angular/core/testing';

import { ResourceDetailService } from './resource-detail.service';

describe('ResourceDetailService', () => {
  let service: ResourceDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
