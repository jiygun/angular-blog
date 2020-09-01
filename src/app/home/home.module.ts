import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './index.component';
import { SliderAngularModule } from 'slider-angular';
import { SliderComponent } from './slider.component';
import { BlogModule } from '../blog/blog.module';

@NgModule({
  declarations: [
    HomeComponent,
    IndexComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    SliderAngularModule,
    BlogModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
