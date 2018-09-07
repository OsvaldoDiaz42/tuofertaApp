import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarnegocioComponent } from './registrarnegocio.component';

describe('RegistrarnegocioComponent', () => {
  let component: RegistrarnegocioComponent;
  let fixture: ComponentFixture<RegistrarnegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarnegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarnegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
