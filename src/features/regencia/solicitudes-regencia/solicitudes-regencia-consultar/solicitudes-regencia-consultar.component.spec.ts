import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesRegenciaConsultarComponent } from './solicitudes-regencia-consultar.component';

describe('SolicitudesRegenciaConsultarComponent', () => {
  let component: SolicitudesRegenciaConsultarComponent;
  let fixture: ComponentFixture<SolicitudesRegenciaConsultarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesRegenciaConsultarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesRegenciaConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
