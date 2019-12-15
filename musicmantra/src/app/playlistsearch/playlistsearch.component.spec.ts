import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsearchComponent } from './playlistsearch.component';

describe('PlaylistsearchComponent', () => {
  let component: PlaylistsearchComponent;
  let fixture: ComponentFixture<PlaylistsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
