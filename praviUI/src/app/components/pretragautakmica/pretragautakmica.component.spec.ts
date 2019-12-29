import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PretragautakmicaComponent } from './pretragautakmica.component';

describe('PretragautakmicaComponent', () => {
  let component: PretragautakmicaComponent;
  let fixture: ComponentFixture<PretragautakmicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PretragautakmicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PretragautakmicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
