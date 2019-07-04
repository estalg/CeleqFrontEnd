import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposAsignarComponent } from './grupos-asignar.component';

describe('GruposAsignarComponent', () => {
  let component: GruposAsignarComponent;
  let fixture: ComponentFixture<GruposAsignarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposAsignarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
