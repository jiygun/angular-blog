import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './index.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListModule } from '../list/list.module';
import { InsertModule } from '../insert/insert.module';


@NgModule({
  declarations: [
    AdminComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    ListModule,
    InsertModule,
    SharedModule,
    FontAwesomeModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
