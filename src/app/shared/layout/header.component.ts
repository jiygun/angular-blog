import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { faBars,faSearch,IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host:{"(window:resize)":"onResize()","(window:click)":"onClick($event)"}
})
export class HeaderComponent implements OnInit {

  private isSearchOpen:boolean;
  private isToggle:boolean;
  private _faBars:IconDefinition;
  private _faSearch:IconDefinition;
  private checkIsClicked:boolean;
  
  @ViewChild('searchInput') searchInput:ElementRef;
  @ViewChild('menuList') menuList:ElementRef;
  
  constructor() { 
    this.isToggle=false;
    this.isSearchOpen=false;
    this.checkIsClicked=false;
    this._faBars=faBars;
    this._faSearch=faSearch;
  }

  ngOnInit(): void {
  }
  openMenu(menuList){
    this.isToggle?this.isToggle=false:this.isToggle=true;
    this.isToggle?this.menuList.nativeElement.style.maxHeight=this.menuList.nativeElement.scrollHeight+'px':this.menuList.nativeElement.style.maxHeight=0;
  }
  setSearchDisplay($event){
    $event.target.className==="input"?null:this.isSearchOpen?this.isSearchOpen=false:(this.isSearchOpen=true,this.checkIsClicked=true);
  }
  showSearchBox(){
    return this.isSearchOpen?"active--flex":null;
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(){
    /*const host=this.elementRef.nativeElement;
    const navbar=this.elementRef.nativeElement.querySelector('.navbar');
    window.pageYOffset>(navbar.clientHeight)?(host.setAttribute("style",`height:${navbar.offsetHeight}px`),navbar.classList.add("navbar--fixed")):navbar.classList.remove("navbar--fixed");*/
  }
  onClick($event){
    $event.target.className!="input"&&!this.checkIsClicked&&this.searchInput.nativeElement.classList.contains("active--flex")?(this.searchInput.nativeElement.classList.remove('active--flex'),this.isSearchOpen=false):null;
    this.checkIsClicked=false;
    ($event.target.className=="logo"||$event.target.className=="navbar__left")?(this.menuList.nativeElement.style.maxHeight=0,this.isToggle=false):null;
  }
  onResize(){
    //window.innerWidth>=991?(this.menu.nativeElement.style.transition="all 0s",this._setSearchVisibility=this._isSearchOpen):
    //(this.menu.nativeElement.style.transition="all .45s",this.search.nativeElement.classList.remove('active'),this._isSearchOpen=false,this._setSearchVisibility=true);
  }
  get faBars():IconDefinition{
    return this._faBars;
  }
  get faSearch():IconDefinition{
    return this._faSearch;
  }
}
