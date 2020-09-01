import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { Comment } from '../core/models/comment';
import { CommentModel } from '../core/models/comment.model';
import { CommentService } from '../core/services/comment.service';
import { Loader } from '../shared/loader/loader-creator';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  private _isToggle:boolean;
  private _isFormSubmit:boolean;
  private _commentModel:CommentModel;

  private _commentItem:HTMLElement;
  
  @Input() commentList:Array<Comment>;
  @Output() commentIsChange:EventEmitter<boolean>;

  constructor(private commentService:CommentService,private viewContainerRef:ViewContainerRef,private componentFactoryResolver:ComponentFactoryResolver) { 
    this.commentIsChange=new EventEmitter<boolean>();
    this._commentModel=new CommentModel();
    this._isFormSubmit=false;
    this._isToggle=false;
  }

  ngOnInit(): void {
  }
  commentIsChanged(isChange:boolean){
    this.commentIsChange.emit(isChange);
  }
  isClick(commentItem:HTMLElement){
    commentItem.style.maxHeight===""?commentItem.style.maxHeight=(commentItem.scrollHeight+'px'):
    commentItem.style.maxHeight==="0px"?commentItem.style.maxHeight=(commentItem.scrollHeight+'px'):
    commentItem.style.maxHeight="0px";
  }
  addComment(form,commentId:number){
    this._isFormSubmit=true;
    form.valid?(this.insertComment(commentId),this._isFormSubmit=false):null;
  }
  private insertComment(commentId:number){
    this._commentModel.date=new Date();
    let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
    this.commentService.addComment(this._commentModel,null,commentId).subscribe(res=>(this.commentIsChange.emit(true),loader.deleteLoader(),this._commentModel=new CommentModel()))
  }
  get commentModel():CommentModel{
    return this._commentModel;
  }
  get isFormSubmit():boolean{
    return this._isFormSubmit
  }
}
