import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajstadionComponent } from './dodajstadion.component';

describe('DodajstadionComponent', () => {
  let component: DodajstadionComponent;
  let fixture: ComponentFixture<DodajstadionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajstadionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajstadionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
