import { TestBed } from '@angular/core/testing';

import { UmiService } from './umi.service';

describe('UmiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UmiService = TestBed.get(UmiService);
    expect(service).toBeTruthy();
  });
});
