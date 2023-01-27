import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageArtistProfileComponent } from './manage-artist-profile.component';

describe('ManageArtistProfileComponent', () => {
  let component: ManageArtistProfileComponent;
  let fixture: ComponentFixture<ManageArtistProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageArtistProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageArtistProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
