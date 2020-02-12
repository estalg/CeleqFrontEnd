import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioGirasEditarComponent } from './precio-giras-editar.component';

describe('PrecioGirasEditarComponent', () => {
  let component: PrecioGirasEditarComponent;
  let fixture: ComponentFixture<PrecioGirasEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecioGirasEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioGirasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
