import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajliguComponent } from './dodajligu.component';

describe('DodajliguComponent', () => {
  let component: DodajliguComponent;
  let fixture: ComponentFixture<DodajliguComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajliguComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajliguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
