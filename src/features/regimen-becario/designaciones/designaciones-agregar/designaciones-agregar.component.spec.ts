import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignacionesAgregarComponent } from './designaciones-agregar.component';

describe('DesignacionesAgregarComponent', () => {
  let component: DesignacionesAgregarComponent;
  let fixture: ComponentFixture<DesignacionesAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignacionesAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignacionesAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
