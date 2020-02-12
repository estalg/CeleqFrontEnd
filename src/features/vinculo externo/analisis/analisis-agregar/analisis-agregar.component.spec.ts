import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisAgregarComponent } from './analisis-agregar.component';

describe('AnalisisAgregarComponent', () => {
  let component: AnalisisAgregarComponent;
  let fixture: ComponentFixture<AnalisisAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalisisAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalisisAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
