import { TestBed } from '@angular/core/testing';

import { CristaleriaService } from './cristaleria.service';

describe('CristaleriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CristaleriaService = TestBed.get(CristaleriaService);
    expect(service).toBeTruthy();
  });
});
