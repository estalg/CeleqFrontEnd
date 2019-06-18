import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesRegenciaListarComponent } from './solicitudes-regencia-listar.component';

describe('SolicitudesRegenciaListarComponent', () => {
  let component: SolicitudesRegenciaListarComponent;
  let fixture: ComponentFixture<SolicitudesRegenciaListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesRegenciaListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesRegenciaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
