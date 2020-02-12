import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioGirasListarComponent } from './precio-giras-listar.component';

describe('PrecioGirasListarComponent', () => {
  let component: PrecioGirasListarComponent;
  let fixture: ComponentFixture<PrecioGirasListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecioGirasListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioGirasListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
