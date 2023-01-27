import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from "./login-routing.module";
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
// import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    // CoreModule,
    SharedModule
  ],
  providers: [
    AuthService
  ]
})
export class LoginModule { }
