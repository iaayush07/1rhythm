import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioBookingFormComponent } from './studio-booking-form.component';

describe('StudioBookingFormComponent', () => {
  let component: StudioBookingFormComponent;
  let fixture: ComponentFixture<StudioBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudioBookingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudioBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
