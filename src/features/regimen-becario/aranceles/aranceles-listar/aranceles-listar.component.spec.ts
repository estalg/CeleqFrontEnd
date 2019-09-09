import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArancelesListarComponent } from './aranceles-listar.component';

describe('ArancelesListarComponent', () => {
  let component: ArancelesListarComponent;
  let fixture: ComponentFixture<ArancelesListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArancelesListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArancelesListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
