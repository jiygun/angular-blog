import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { HomeModule } from "./home/home.module";
import { SharedModule } from "./shared/shared.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BlogModule } from "./blog/blog.module";
import { ListModule } from "./list/list.module";
import { CategoryModule } from "./category/category.module";
import { ArchiveModule } from "./archive/archive.module";
import { MenuModule } from "./menu/menu.module";
import { CommentModule } from './comment/comment.module';
import { AskModule } from './ask/ask.module';
import { DetailModule } from './detail/detail.module'; 
import { AboutModule } from './about/about.module';
import { AdminModule } from './admin/admin.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { InsertModule } from './insert/insert.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HomeModule,
    AdminModule,
    BlogModule,
    MenuModule,
    ListModule,
    CategoryModule,
    ArchiveModule,
    CommentModule,
    DetailModule,
    AskModule,
    AboutModule,
    InsertModule,
    AuthenticationModule,
    SharedModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
