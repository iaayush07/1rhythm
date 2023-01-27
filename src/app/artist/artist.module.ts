import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistRoutingModule } from './artist-routing.module';
import { ArtistComponent } from './artist.component';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistDescriptionComponent } from './artist-description/artist-description.component';
import { ArtistBookingFormComponent } from './artist-booking-form/artist-booking-form.component';
import { ManageArtistProfileComponent } from './manage-artist-profile/manage-artist-profile.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageArtistProfileService } from './manage-artist-profile/manage-artist-profile.service';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SharedModule } from '../shared/shared.module';
import { ArtistService } from './services/artist.service';

@NgModule({
  declarations: [
    ArtistComponent,
    ArtistListComponent,
    ArtistDescriptionComponent,
    ArtistBookingFormComponent,
    ManageArtistProfileComponent,
    BookingDetailsComponent,

  ],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    // HttpClientModule,
    NgxDropzoneModule,
    SharedModule
  ],
  providers: [ManageArtistProfileService,

    // HttpClientModule
  ]

})
export class ArtistModule { }
