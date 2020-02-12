import { TestBed } from '@angular/core/testing';

import { precioGirasService } from './precioGiras.service';

describe('precioGirasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: precioGirasService = TestBed.get(precioGirasService);
    expect(service).toBeTruthy();
  });
});
