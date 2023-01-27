import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioDescriptionComponent } from './studio-description.component';

describe('StudioDescriptionComponent', () => {
  let component: StudioDescriptionComponent;
  let fixture: ComponentFixture<StudioDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudioDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudioDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
