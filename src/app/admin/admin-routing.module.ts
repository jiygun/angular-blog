import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { IndexComponent } from './index.component';
import { InsertBlogComponent } from '../insert/insert-blog.component';
import { InsertCategoryComponent } from '../insert/insert-category.component';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { AuthenticationService } from '../authentication/authentication.service';

const routes: Routes = [
  {path:'auth',component:AuthenticationComponent},
  {path:'admin',canActivate:[AuthenticationService],component:AdminComponent,children:[
    {path:'',component:IndexComponent},
    {path:'blog',component:InsertBlogComponent},
    {path:'category',component:InsertCategoryComponent},
    
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
