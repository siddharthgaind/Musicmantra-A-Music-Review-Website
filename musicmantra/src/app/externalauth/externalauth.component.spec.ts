import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalauthComponent } from './externalauth.component';

describe('ExternalauthComponent', () => {
  let component: ExternalauthComponent;
  let fixture: ComponentFixture<ExternalauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalauthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
