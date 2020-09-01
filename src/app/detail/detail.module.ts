import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { CommentModule } from '../comment/comment.module';
import { AskModule } from '../ask/ask.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    CommentModule,
    RouterModule,
    AskModule
  ],
  exports:[
    DetailComponent
  ]
})
export class DetailModule { }
