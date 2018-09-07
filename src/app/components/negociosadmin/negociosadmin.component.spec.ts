import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegociosadminComponent } from './negociosadmin.component';

describe('NegociosadminComponent', () => {
  let component: NegociosadminComponent;
  let fixture: ComponentFixture<NegociosadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegociosadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegociosadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
