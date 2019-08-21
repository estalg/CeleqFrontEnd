import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesUmiAprobarComponent } from './solicitudes-umi-aprobar.component';

describe('SolicitudesUmiAprobarComponent', () => {
  let component: SolicitudesUmiAprobarComponent;
  let fixture: ComponentFixture<SolicitudesUmiAprobarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesUmiAprobarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesUmiAprobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
