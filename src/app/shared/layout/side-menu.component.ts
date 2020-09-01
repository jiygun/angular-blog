import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SideMenuService } from 'angular-sidemenu';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  host:{'(window:mousedown)':'onMouseDown($event)',"(window:mousemove)":"onMouseMove($event)","(window:mouseup)":"onMouseUp($event)","(window:resize)":"onResize($event)"}
})
export class SideMenuComponent implements OnInit,AfterViewInit {

  @ViewChild('sideMenu') sideMenu:ElementRef;

  constructor(private sideMenuService:SideMenuService) { }
  ngAfterViewInit(): void {
    this.sideMenuService.sideMenu=this.sideMenu.nativeElement;
    this.sideMenuService.ngAfterViewInit();
  }

  ngOnInit(): void {
  }
  sideMenuStyle(){
    return  this.sideMenuService.getStyles();
  }
  onMouseDown($event){
    this.sideMenuService.onMouseDown($event);
  }
  onMouseMove($event){
    this.sideMenuService.onMouseMove($event);
  }
  onMouseUp($event){
    this.sideMenuService.onMouseUp($event);
  }
  onResize($event){
    this.sideMenuService.onResize($event);
  }
}