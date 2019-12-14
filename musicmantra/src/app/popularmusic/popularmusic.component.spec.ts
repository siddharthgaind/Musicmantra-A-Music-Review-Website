import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularmusicComponent } from './popularmusic.component';

describe('PopularmusicComponent', () => {
  let component: PopularmusicComponent;
  let fixture: ComponentFixture<PopularmusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularmusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularmusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
