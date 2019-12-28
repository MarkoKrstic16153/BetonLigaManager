import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajutakmicuComponent } from './dodajutakmicu.component';

describe('DodajutakmicuComponent', () => {
  let component: DodajutakmicuComponent;
  let fixture: ComponentFixture<DodajutakmicuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajutakmicuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajutakmicuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
