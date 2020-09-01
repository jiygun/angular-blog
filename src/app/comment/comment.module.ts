import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRoutingModule } from './comment-routing.module';
import { CommentComponent } from './comment.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CommentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CommentRoutingModule
  ],
  exports:[
    CommentComponent
  ]
})
export class CommentModule { }
