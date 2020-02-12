import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeriadosListarComponent } from './feriados-listar.component';

describe('FeriadosListarComponent', () => {
  let component: FeriadosListarComponent;
  let fixture: ComponentFixture<FeriadosListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeriadosListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeriadosListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
