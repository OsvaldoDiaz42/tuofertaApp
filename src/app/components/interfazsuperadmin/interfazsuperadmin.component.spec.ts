import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfazsuperadminComponent } from './interfazsuperadmin.component';

describe('InterfazsuperadminComponent', () => {
  let component: InterfazsuperadminComponent;
  let fixture: ComponentFixture<InterfazsuperadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfazsuperadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfazsuperadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
