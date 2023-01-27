import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './core/components/master/master.component';
import { AuthGuard } from './core/services/guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { BookingHistoryComponent } from './shared/components/booking-history/booking-history.component';
import { ManageProfileComponent } from './shared/components/manage-profile/manage-profile.component';

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home', component: HomeComponent
      },
      { path: 'artist', loadChildren: () => import('./artist/artist.module').then(m => m.ArtistModule) },
      { path: 'studio', loadChildren: () => import('./studio/studio.module').then(m => m.StudioModule) },
      /** 
 * @author : Charvi Sarang
 * setting routing of booking-history & manage-profile
 */
      {
        path: 'booking-history',
        component: BookingHistoryComponent
      },
      {
        path: 'manage-profile',
        component: ManageProfileComponent
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./user/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./user/registration/registration.module').then(m => m.RegistrationModule)
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
