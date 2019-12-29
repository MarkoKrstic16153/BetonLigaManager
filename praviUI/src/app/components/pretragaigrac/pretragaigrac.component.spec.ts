import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PretragaigracComponent } from './pretragaigrac.component';

describe('PretragaigracComponent', () => {
  let component: PretragaigracComponent;
  let fixture: ComponentFixture<PretragaigracComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PretragaigracComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PretragaigracComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
