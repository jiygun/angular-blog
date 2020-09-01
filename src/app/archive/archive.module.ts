import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchiveRoutingModule } from './archive-routing.module';
import { ArchiveComponent } from './archive.component';
import { SharedModule } from '../shared/shared.module';
import { ActiveArchiveService } from "./active-archive.service";


@NgModule({
  declarations: [
    ArchiveComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ArchiveRoutingModule
  ],
  exports:[
    ArchiveComponent
  ],
  providers:[
    ActiveArchiveService
  ]
})
export class ArchiveModule { }
