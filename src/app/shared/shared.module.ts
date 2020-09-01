import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layout/footer.component';
import { HeaderComponent } from './layout/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { DateConvertor } from './pipes/dateconvertor.pipe';
import { TextSummaryPipe } from './pipes/text-summary.pipe';
import { SideMenuComponent } from './layout/side-menu.component';
import { LoaderComponent } from './loader/loader.component';
import { AlertComponent } from './alert/alert.component';


@NgModule({
  declarations: [
    FooterComponent, 
    HeaderComponent, 
    DateConvertor, 
    TextSummaryPipe,
    SideMenuComponent,
    LoaderComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],exports:[
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    DateConvertor,
    TextSummaryPipe,
  ],
  providers:[
  ]
})
export class SharedModule { }
