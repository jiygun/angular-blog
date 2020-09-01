import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../core/services/blog.service';
import { CommentService } from '../core/services/comment.service';
import { BlogModel } from '../core/models/blog.model';
import { Loader } from '../shared/loader/loader-creator';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  private _blog:BlogModel;

  constructor(private blogService:BlogService,private activatedRoute:ActivatedRoute,private viewContainerRef:ViewContainerRef,private componentFactoryResolver:ComponentFactoryResolver) { }

  ngOnInit(): void {
    let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
    this.activatedRoute.paramMap.subscribe((result:any)=>{
      this.blogService.getBlogWithById(parseInt(result.get('id'))).subscribe((blog:BlogModel)=>(this._blog=blog,loader.deleteLoader()));
    });
  }
  commentIsChanged(isChange:boolean){
    
  }
  get blog():BlogModel{
    return this._blog;
  }
}
