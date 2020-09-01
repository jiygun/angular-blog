import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { ActiveCategoryService } from "./active-category.service";

@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ],
  exports:[
    CategoryComponent
  ],
  providers:[
    ActiveCategoryService
  ]
})
export class CategoryModule { }
