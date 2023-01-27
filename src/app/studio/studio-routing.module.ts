import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageStudioProfileComponent } from './manage-studio-profile/manage-studio-profile.component';
import { StudioDescriptionComponent } from './studio-description/studio-description.component';
import { StudioListComponent } from './studio-list/studio-list.component';
import { StudioComponent } from './studio.component';

const routes: Routes = [
  {
    /** 
   * @author : Charvi Sarang
   * setting routing of studio
   */
    path: '',
    component: StudioComponent,
    children: [
      {
        path: 'studio-list',
        component: StudioListComponent
      },
      {
        path: 'manage-studio-profile',
        component: ManageStudioProfileComponent
      },
      {
        path: 'studio-description/:id',
        component: StudioDescriptionComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudioRoutingModule { }
