import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesListarComponent } from './unidades-listar.component';

describe('UnidadesListarComponent', () => {
  let component: UnidadesListarComponent;
  let fixture: ComponentFixture<UnidadesListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadesListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
