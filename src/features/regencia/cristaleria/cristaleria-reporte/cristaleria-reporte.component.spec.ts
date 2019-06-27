import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CristaleriaReporteComponent } from './cristaleria-reporte.component';

describe('CristaleriaReporteComponent', () => {
  let component: CristaleriaReporteComponent;
  let fixture: ComponentFixture<CristaleriaReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CristaleriaReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CristaleriaReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
