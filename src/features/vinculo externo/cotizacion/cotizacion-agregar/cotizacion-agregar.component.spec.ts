import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionAgregarComponent } from './cotizacion-agregar.component';

describe('CotizacionAgregarComponent', () => {
  let component: CotizacionAgregarComponent;
  let fixture: ComponentFixture<CotizacionAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizacionAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
