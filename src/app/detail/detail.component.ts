import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { BlogModel } from '../core/models/blog.model';
import { BlogService } from '../core/services/blog.service';
import { CommentService } from '../core/services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../core/models/comment';
import { Loader } from '../shared/loader/loader-creator';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  private _blogId:number;
  private _blog:BlogModel;
  private _commentList:Array<Comment>;

  constructor(private blogService:BlogService,private commentService:CommentService,private activatedRoute:ActivatedRoute,private viewContainerRef:ViewContainerRef,private componentFactoryResolver:ComponentFactoryResolver) { 
    this._blog=new BlogModel();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((result:any)=>{
      this._blogId=parseInt(result.get('id'));
      let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
      this.blogService.getBlogWithById(this._blogId).subscribe((blog:BlogModel)=>(this._blog=blog,loader.deleteLoader()));
      let loaderComment =new Loader(this.viewContainerRef,this.componentFactoryResolver);
      this.commentService.getCommentWithBlogId(this._blogId).subscribe((commentList:Array<Comment>)=>(this._commentList=commentList,loaderComment.deleteLoader()));
    });
  }
  commentIsChanged(isChange:boolean){
    let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
    isChange?this.commentService.getCommentWithBlogId(this._blogId).subscribe((commentList:Array<Comment>)=>(this._commentList=commentList,loader.deleteLoader())):null;
  }
  get blog():BlogModel{
    return this._blog;
  }
  get commentList():Array<Comment>{
    return this._commentList;
  }
}
