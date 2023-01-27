import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationService } from 'src/app/core/services/registration/registration.service';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [
    RegistrationService
  ]
})
export class RegistrationModule { }
