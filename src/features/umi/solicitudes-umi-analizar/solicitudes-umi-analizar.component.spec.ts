import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesUmiAnalizarComponent } from './solicitudes-umi-analizar.component';

describe('SolicitudesUmiAnalizarComponent', () => {
  let component: SolicitudesUmiAnalizarComponent;
  let fixture: ComponentFixture<SolicitudesUmiAnalizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesUmiAnalizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesUmiAnalizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
