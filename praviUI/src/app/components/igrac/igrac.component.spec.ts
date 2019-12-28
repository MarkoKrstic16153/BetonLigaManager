import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgracComponent } from './igrac.component';

describe('IgracComponent', () => {
  let component: IgracComponent;
  let fixture: ComponentFixture<IgracComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgracComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgracComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
