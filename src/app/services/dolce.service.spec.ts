import { TestBed } from '@angular/core/testing';

import { DolceService } from './dolce.service';

describe('DolceService', () => {
  let service: DolceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DolceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
