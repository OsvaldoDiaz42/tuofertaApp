import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasadminComponent } from './ofertasadmin.component';

describe('OfertasadminComponent', () => {
  let component: OfertasadminComponent;
  let fixture: ComponentFixture<OfertasadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertasadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertasadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
