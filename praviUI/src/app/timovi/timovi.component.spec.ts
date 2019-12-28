import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimoviComponent } from './timovi.component';

describe('TimoviComponent', () => {
  let component: TimoviComponent;
  let fixture: ComponentFixture<TimoviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimoviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
