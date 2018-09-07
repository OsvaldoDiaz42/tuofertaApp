import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfazusuarioComponent } from './interfazusuario.component';

describe('InterfazusuarioComponent', () => {
  let component: InterfazusuarioComponent;
  let fixture: ComponentFixture<InterfazusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfazusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfazusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
