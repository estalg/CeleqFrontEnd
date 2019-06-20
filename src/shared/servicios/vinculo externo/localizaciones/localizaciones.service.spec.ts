import { TestBed } from '@angular/core/testing';

import { LocalizacionesService } from './localizaciones.service';

describe('LocalizacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalizacionesService = TestBed.get(LocalizacionesService);
    expect(service).toBeTruthy();
  });
});
