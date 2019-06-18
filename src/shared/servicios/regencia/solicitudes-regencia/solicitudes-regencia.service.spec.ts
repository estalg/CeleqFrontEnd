import { TestBed } from '@angular/core/testing';

import { SolicitudesRegenciaService } from './solicitudes-regencia.service';

describe('SolicitudesRegenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolicitudesRegenciaService = TestBed.get(SolicitudesRegenciaService);
    expect(service).toBeTruthy();
  });
});
