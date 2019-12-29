import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainrouterComponent } from './mainrouter.component';

describe('MainrouterComponent', () => {
  let component: MainrouterComponent;
  let fixture: ComponentFixture<MainrouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainrouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainrouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
