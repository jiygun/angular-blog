import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { TableListComponent } from './table-list.component';
import { TableListChangeService } from './table-list-change.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListComponent, 
    TableListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ListRoutingModule
  ],
  exports:[
    ListComponent,
    TableListComponent
  ],
  providers:[
    TableListChangeService
  ]
})
export class ListModule { }
