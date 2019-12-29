import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PretragatimComponent } from './pretragatim.component';

describe('PretragatimComponent', () => {
  let component: PretragatimComponent;
  let fixture: ComponentFixture<PretragatimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PretragatimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PretragatimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
