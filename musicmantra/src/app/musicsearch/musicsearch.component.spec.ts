import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicsearchComponent } from './musicsearch.component';

describe('MusicsearchComponent', () => {
  let component: MusicsearchComponent;
  let fixture: ComponentFixture<MusicsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
