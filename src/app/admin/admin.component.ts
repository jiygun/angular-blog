import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SideMenuChangeService } from 'angular-sidemenu';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit,AfterViewInit {

  @ViewChild('main') main:ElementRef;

  constructor(private sideMenuChangeService:SideMenuChangeService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.sideMenuChangeService.sideMenuWidth.subscribe(res=>{
       this.main.nativeElement.style.marginLeft=res+"%";
    });
  }


}
