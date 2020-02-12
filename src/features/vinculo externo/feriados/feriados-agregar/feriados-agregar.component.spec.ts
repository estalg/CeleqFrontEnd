import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeriadosAgregarComponent } from './feriados-agregar.component';

describe('FeriadosAgregarComponent', () => {
  let component: FeriadosAgregarComponent;
  let fixture: ComponentFixture<FeriadosAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeriadosAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeriadosAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
