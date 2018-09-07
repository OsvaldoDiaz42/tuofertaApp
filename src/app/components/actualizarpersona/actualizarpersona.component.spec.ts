import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarpersonaComponent } from './actualizarpersona.component';

describe('ActualizarpersonaComponent', () => {
  let component: ActualizarpersonaComponent;
  let fixture: ComponentFixture<ActualizarpersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarpersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarpersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
