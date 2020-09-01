import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { BlogModel } from '../core/models/blog.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit,OnChanges {
  
  @Input() blogList:Array<BlogModel>;
  constructor() { 
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }
}
