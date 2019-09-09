import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrarReporteComponent } from './filtrar-reporte.component';

describe('FiltrarReporteComponent', () => {
  let component: FiltrarReporteComponent;
  let fixture: ComponentFixture<FiltrarReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrarReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrarReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
