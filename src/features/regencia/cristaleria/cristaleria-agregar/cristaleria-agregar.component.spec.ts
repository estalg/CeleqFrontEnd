import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CristaleriaAgregarComponent } from './cristaleria-agregar.component';

describe('CristaleriaAgregarComponent', () => {
  let component: CristaleriaAgregarComponent;
  let fixture: ComponentFixture<CristaleriaAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CristaleriaAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CristaleriaAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
