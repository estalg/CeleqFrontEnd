import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestoConsultarComponent } from './presupuesto-consultar.component';

describe('PresupuestoConsultarComponent', () => {
  let component: PresupuestoConsultarComponent;
  let fixture: ComponentFixture<PresupuestoConsultarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresupuestoConsultarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresupuestoConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
