import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDesignacionesComponent } from './reporte-designaciones.component';

describe('ReporteDesignacionesComponent', () => {
  let component: ReporteDesignacionesComponent;
  let fixture: ComponentFixture<ReporteDesignacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteDesignacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteDesignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
