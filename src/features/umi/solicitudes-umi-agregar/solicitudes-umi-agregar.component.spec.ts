import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesUmiAgregarComponent } from './solicitudes-umi-agregar.component';

describe('SolicitudesUmiAgregarComponent', () => {
  let component: SolicitudesUmiAgregarComponent;
  let fixture: ComponentFixture<SolicitudesUmiAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesUmiAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesUmiAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
