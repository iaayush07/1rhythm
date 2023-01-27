import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistBookingFormComponent } from './artist-booking-form.component';

describe('ArtistBookingFormComponent', () => {
  let component: ArtistBookingFormComponent;
  let fixture: ComponentFixture<ArtistBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistBookingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
