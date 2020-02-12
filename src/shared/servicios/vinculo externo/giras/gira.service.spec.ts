import { TestBed } from '@angular/core/testing';

import { GiraService } from './gira.service';

describe('GiraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GiraService = TestBed.get(GiraService);
    expect(service).toBeTruthy();
  });
});
