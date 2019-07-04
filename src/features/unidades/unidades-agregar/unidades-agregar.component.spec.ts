import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesAgregarComponent } from './unidades-agregar.component';

describe('UnidadesAgregarComponent', () => {
  let component: UnidadesAgregarComponent;
  let fixture: ComponentFixture<UnidadesAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadesAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
