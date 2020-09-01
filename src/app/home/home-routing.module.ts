import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from '../blog/blog.component';
import { BloglistComponent } from '../blog/bloglist.component';
import { HomeComponent } from './home.component';
import { IndexComponent } from './index.component';
import { AboutComponent } from '../about/about.component';

const routes: Routes = [
  {path:'',component:HomeComponent,children:[
    {path:'',component:IndexComponent},
    {path:'index',component:IndexComponent},
    {path:'blog',component:BloglistComponent},
    {path:'blog/:id',component:BlogComponent},
    {path:'about',component:AboutComponent}
  ]},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
