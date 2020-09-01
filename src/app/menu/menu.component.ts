import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faFilter, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private _faFilter:IconDefinition;
  @ViewChild('blogMenu') blogMenu:ElementRef;

  constructor() { 
    this._faFilter=faFilter;
  }
  ngOnInit(): void {
  }
  openList(){
    this.blogMenu.nativeElement.classList.contains('active--flex')?this.blogMenu.nativeElement.classList.remove('active--flex'):this.blogMenu.nativeElement.classList.add('active--flex');
  }
  get faFilter():IconDefinition{
    return this._faFilter;
  }
}
