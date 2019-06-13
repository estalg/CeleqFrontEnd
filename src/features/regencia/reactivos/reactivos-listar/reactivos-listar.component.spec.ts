import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivosListarComponent } from './reactivos-listar.component';

describe('ReactivosListarComponent', () => {
  let component: ReactivosListarComponent;
  let fixture: ComponentFixture<ReactivosListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactivosListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactivosListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
