import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivosAgregarComponent } from './reactivos-agregar.component';

describe('ReactivosAgregarComponent', () => {
  let component: ReactivosAgregarComponent;
  let fixture: ComponentFixture<ReactivosAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactivosAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactivosAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
