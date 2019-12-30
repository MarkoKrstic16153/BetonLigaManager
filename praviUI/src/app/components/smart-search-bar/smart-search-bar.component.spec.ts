import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartSearchBarComponent } from './smart-search-bar.component';

describe('SmartSearchBarComponent', () => {
  let component: SmartSearchBarComponent;
  let fixture: ComponentFixture<SmartSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartSearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
