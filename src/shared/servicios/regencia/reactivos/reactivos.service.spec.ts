import { TestBed } from '@angular/core/testing';

import { ReactivosService } from './reactivos.service';

describe('ReactivosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReactivosService = TestBed.get(ReactivosService);
    expect(service).toBeTruthy();
  });
});
