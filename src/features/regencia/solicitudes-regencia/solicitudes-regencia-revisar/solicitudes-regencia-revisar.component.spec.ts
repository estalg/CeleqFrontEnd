import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesRegenciaRevisarComponent } from './solicitudes-regencia-revisar.component';

describe('SolicitudesRegenciaRevisarComponent', () => {
  let component: SolicitudesRegenciaRevisarComponent;
  let fixture: ComponentFixture<SolicitudesRegenciaRevisarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesRegenciaRevisarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesRegenciaRevisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
