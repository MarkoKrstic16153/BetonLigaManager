import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PretragastadionComponent } from './pretragastadion.component';

describe('PretragastadionComponent', () => {
  let component: PretragastadionComponent;
  let fixture: ComponentFixture<PretragastadionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PretragastadionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PretragastadionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
