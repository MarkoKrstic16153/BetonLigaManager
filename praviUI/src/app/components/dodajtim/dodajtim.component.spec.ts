import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajtimComponent } from './dodajtim.component';

describe('DodajtimComponent', () => {
  let component: DodajtimComponent;
  let fixture: ComponentFixture<DodajtimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajtimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajtimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
