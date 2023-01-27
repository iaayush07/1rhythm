import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './components/master/master.component';
import { HeaderComponent } from './components/navbar/header/header.component';
import { RouterModule } from '@angular/router';
import { LoaderService } from './services/loader/loader.service';
import { LoaderComponent } from './components/loader/loader.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { AuthInterceptor } from './services/interceptor/auth.interceptor';
import { RegistrationService } from './services/registration/registration.service';

import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MasterComponent,
    HeaderComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    // HttpClientModule,
    NgbCarouselModule,
    NgbModule
  ],
  providers: [LoaderService, AuthService, RegistrationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  exports: [MasterComponent, HeaderComponent, LoaderComponent]
})
export class CoreModule { }
