import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesUmiDetallesComponent } from './solicitudes-umi-detalles.component';

describe('SolicitudesUmiDetallesComponent', () => {
  let component: SolicitudesUmiDetallesComponent;
  let fixture: ComponentFixture<SolicitudesUmiDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesUmiDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesUmiDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
