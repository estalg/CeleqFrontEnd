import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignacionesListarComponent } from './designaciones-listar.component';

describe('DesignacionesListarComponent', () => {
  let component: DesignacionesListarComponent;
  let fixture: ComponentFixture<DesignacionesListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignacionesListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignacionesListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
