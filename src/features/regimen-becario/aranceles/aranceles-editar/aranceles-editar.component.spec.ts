import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArancelesEditarComponent } from './aranceles-editar.component';

describe('ArancelesEditarComponent', () => {
  let component: ArancelesEditarComponent;
  let fixture: ComponentFixture<ArancelesEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArancelesEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArancelesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
