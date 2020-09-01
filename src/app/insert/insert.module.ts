import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsertBlogComponent } from './insert-blog.component';
import { InsertCategoryComponent } from './insert-category.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InsertBlogComponent, 
    InsertCategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class InsertModule { }
