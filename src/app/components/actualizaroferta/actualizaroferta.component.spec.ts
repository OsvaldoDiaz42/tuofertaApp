import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarofertaComponent } from './actualizaroferta.component';

describe('ActualizarofertaComponent', () => {
  let component: ActualizarofertaComponent;
  let fixture: ComponentFixture<ActualizarofertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarofertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarofertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
