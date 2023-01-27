import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistDescriptionComponent } from './artist-description/artist-description.component';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistComponent } from './artist.component';
import { ManageArtistProfileComponent } from './manage-artist-profile/manage-artist-profile.component';
const routes: Routes = [
  /**
   * @author : Charvi Sarang
   * setting routing of artist
   */
  {
    path: '',
    component: ArtistComponent,
    children: [
      {
        path: 'artist-list',
        component: ArtistListComponent
      },
      {
        path: 'manage-artist-profile',
        component: ManageArtistProfileComponent
      },
      {
        path: 'artist-description/:id',
        component: ArtistDescriptionComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistRoutingModule { }
