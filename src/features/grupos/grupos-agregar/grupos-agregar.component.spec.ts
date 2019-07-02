import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposAgregarComponent } from './grupos-agregar.component';

describe('GruposAgregarComponent', () => {
  let component: GruposAgregarComponent;
  let fixture: ComponentFixture<GruposAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
