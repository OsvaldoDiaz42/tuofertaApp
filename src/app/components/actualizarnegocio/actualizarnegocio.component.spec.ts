import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarnegocioComponent } from './actualizarnegocio.component';

describe('ActualizarnegocioComponent', () => {
  let component: ActualizarnegocioComponent;
  let fixture: ComponentFixture<ActualizarnegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarnegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarnegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
