import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedreviewComponent } from './authenticatedreview.component';

describe('AuthenticatedreviewComponent', () => {
  let component: AuthenticatedreviewComponent;
  let fixture: ComponentFixture<AuthenticatedreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticatedreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
