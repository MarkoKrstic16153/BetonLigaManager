import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StadionComponent } from './stadion.component';

describe('StadionComponent', () => {
  let component: StadionComponent;
  let fixture: ComponentFixture<StadionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StadionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StadionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
