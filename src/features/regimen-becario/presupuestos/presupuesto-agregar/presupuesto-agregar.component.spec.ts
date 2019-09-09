import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestoAgregarComponent } from './presupuesto-agregar.component';

describe('PresupuestoAgregarComponent', () => {
  let component: PresupuestoAgregarComponent;
  let fixture: ComponentFixture<PresupuestoAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresupuestoAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresupuestoAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
