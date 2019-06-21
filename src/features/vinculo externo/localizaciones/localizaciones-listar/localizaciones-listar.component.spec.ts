import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizacionesListarComponent } from './localizaciones-listar.component';

describe('LocalizacionesListarComponent', () => {
  let component: LocalizacionesListarComponent;
  let fixture: ComponentFixture<LocalizacionesListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalizacionesListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizacionesListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
