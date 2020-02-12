import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionListarComponent } from './cotizacion-listar.component';

describe('CotizacionListarComponent', () => {
  let component: CotizacionListarComponent;
  let fixture: ComponentFixture<CotizacionListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizacionListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
