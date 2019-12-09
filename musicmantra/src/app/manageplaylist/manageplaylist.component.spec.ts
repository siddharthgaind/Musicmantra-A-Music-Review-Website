import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageplaylistComponent } from './manageplaylist.component';

describe('ManageplaylistComponent', () => {
  let component: ManageplaylistComponent;
  let fixture: ComponentFixture<ManageplaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageplaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
