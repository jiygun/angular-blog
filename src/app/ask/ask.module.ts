import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AskComponent } from './ask.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AskComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    AskComponent
  ]
})
export class AskModule { }
