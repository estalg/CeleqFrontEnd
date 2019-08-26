import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesUmiFinalizarComponent } from './solicitudes-umi-finalizar.component';

describe('SolicitudesUmiFinalizarComponent', () => {
  let component: SolicitudesUmiFinalizarComponent;
  let fixture: ComponentFixture<SolicitudesUmiFinalizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesUmiFinalizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesUmiFinalizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
