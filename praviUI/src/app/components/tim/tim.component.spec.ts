import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimComponent } from './tim.component';

describe('TimComponent', () => {
  let component: TimComponent;
  let fixture: ComponentFixture<TimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
