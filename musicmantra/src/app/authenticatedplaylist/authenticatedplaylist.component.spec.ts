import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedplaylistComponent } from './authenticatedplaylist.component';

describe('AuthenticatedplaylistComponent', () => {
  let component: AuthenticatedplaylistComponent;
  let fixture: ComponentFixture<AuthenticatedplaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticatedplaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
