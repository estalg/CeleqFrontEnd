import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisListarComponent } from './analisis-listar.component';

describe('AnalisisListarComponent', () => {
  let component: AnalisisListarComponent;
  let fixture: ComponentFixture<AnalisisListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalisisListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalisisListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
