import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizacionesAgregarComponent } from './localizaciones-agregar.component';

describe('LocalizacionesAgregarComponent', () => {
  let component: LocalizacionesAgregarComponent;
  let fixture: ComponentFixture<LocalizacionesAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalizacionesAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizacionesAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
