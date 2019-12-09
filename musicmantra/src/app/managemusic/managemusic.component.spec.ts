import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagemusicComponent } from './managemusic.component';

describe('ManagemusicComponent', () => {
  let component: ManagemusicComponent;
  let fixture: ComponentFixture<ManagemusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagemusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagemusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
