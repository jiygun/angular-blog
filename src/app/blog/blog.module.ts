import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { BloglistComponent } from './bloglist.component';
import { AngularPaginateModule } from 'angular-paginate';
import { ListModule } from '../list/list.module';
import { CategoryModule } from '../category/category.module';
import { MenuModule } from '../menu/menu.module';
import { RouterModule } from '@angular/router';
import { DetailModule } from '../detail/detail.module';


@NgModule({
  declarations: [
    BlogComponent, 
    BloglistComponent
  ],
  imports: [
    CommonModule,
    ListModule,
    MenuModule,
    CategoryModule,
    DetailModule,
    RouterModule,
    BlogRoutingModule,
    AngularPaginateModule
  ],
  exports:[
    BlogComponent,
  ]
})
export class BlogModule { }