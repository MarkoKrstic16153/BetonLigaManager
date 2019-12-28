import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajigracaComponent } from './dodajigraca.component';

describe('DodajigracaComponent', () => {
  let component: DodajigracaComponent;
  let fixture: ComponentFixture<DodajigracaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajigracaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajigracaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
