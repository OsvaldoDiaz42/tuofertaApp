import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarpersonaComponent } from './registrarpersona.component';

describe('RegistrarpersonaComponent', () => {
  let component: RegistrarpersonaComponent;
  let fixture: ComponentFixture<RegistrarpersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarpersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarpersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
