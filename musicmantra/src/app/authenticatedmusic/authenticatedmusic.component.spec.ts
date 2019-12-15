import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedmusicComponent } from './authenticatedmusic.component';

describe('AuthenticatedmusicComponent', () => {
  let component: AuthenticatedmusicComponent;
  let fixture: ComponentFixture<AuthenticatedmusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticatedmusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedmusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
