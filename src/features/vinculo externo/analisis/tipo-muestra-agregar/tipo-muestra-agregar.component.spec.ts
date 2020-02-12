import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMuestraAgregarComponent } from './tipo-muestra-agregar.component';

describe('TipoMuestraAgregarComponent', () => {
  let component: TipoMuestraAgregarComponent;
  let fixture: ComponentFixture<TipoMuestraAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoMuestraAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoMuestraAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
