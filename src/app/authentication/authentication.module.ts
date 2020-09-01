import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationService } from './authentication.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    AuthenticationRoutingModule
  ],
  providers:[
    AuthenticationService
  ]
})
export class AuthenticationModule { }
