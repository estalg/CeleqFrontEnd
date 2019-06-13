import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CristaleriaListarComponent } from './cristaleria-listar.component';

describe('CristaleriaListarComponent', () => {
  let component: CristaleriaListarComponent;
  let fixture: ComponentFixture<CristaleriaListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CristaleriaListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CristaleriaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
