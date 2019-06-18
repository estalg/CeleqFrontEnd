import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesRegenciaAgregarComponent } from './solicitudes-regencia-agregar.component';

describe('SolicitudesRegenciaAgregarComponent', () => {
  let component: SolicitudesRegenciaAgregarComponent;
  let fixture: ComponentFixture<SolicitudesRegenciaAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesRegenciaAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesRegenciaAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
