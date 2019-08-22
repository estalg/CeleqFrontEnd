import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesUmiListarComponent } from './solicitudes-umi-listar.component';

describe('SolicitudesUmiListarComponent', () => {
  let component: SolicitudesUmiListarComponent;
  let fixture: ComponentFixture<SolicitudesUmiListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesUmiListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesUmiListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
