import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarAnalisisCotizacionComponent } from './seleccionar-analisis-cotizacion.component';

describe('SeleccionarAnalisisCotizacionComponent', () => {
  let component: SeleccionarAnalisisCotizacionComponent;
  let fixture: ComponentFixture<SeleccionarAnalisisCotizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarAnalisisCotizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarAnalisisCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
