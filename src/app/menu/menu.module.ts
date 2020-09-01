import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { CategoryModule } from '../category/category.module';
import { ArchiveModule } from '../archive/archive.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    CategoryModule,
    ArchiveModule,
    FontAwesomeModule,
    MenuRoutingModule
  ],
  exports:[
    MenuComponent
  ]
})
export class MenuModule { }
