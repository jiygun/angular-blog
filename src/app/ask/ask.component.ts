import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { CommentModel } from '../core/models/comment.model';
import { CommentService } from '../core/services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { Loader } from '../shared/loader/loader-creator';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.scss']
})
export class AskComponent implements OnInit {

  private _isToggle:boolean;
  private _formSubmit:boolean;
  private _isAdd:boolean;
  
  private _comment:CommentModel;

  @Input() blogId:number;
  @Output() commentIsChanged=new EventEmitter<boolean>();
  
  @ViewChild('commentForm') commentForm:ElementRef;

  constructor(private commentService:CommentService,private viewContainerRef:ViewContainerRef,private componentFactoryResolver:ComponentFactoryResolver) {
    this._comment=new CommentModel();
    this._isToggle=false;
    this._formSubmit=false;
    this._isAdd=false;
  }

  ngOnInit(): void {
  }
  submit(form){
    this._formSubmit=true;
    form.valid?(this.addComment(),this._formSubmit=false):null;
  }
  addComment(){
    let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
    this._comment.date=new Date();
    this.commentService.addComment(this._comment,this.blogId,null).subscribe((result:any)=>{
        this._isAdd=true;
        this.commentIsChanged.emit(true);
        loader.deleteLoader();
    });
  }
  isClick(){
    this._isToggle?this._isToggle=false:this._isToggle=true;
  }
  setHeight(commentForm){
    if(commentForm==undefined) return;
    return{
      maxHeight: this._isToggle?commentForm.style.maxHeight=(commentForm.scrollHeight+'px'):commentForm.maxHeight=0
    }
  }
  get isAdd():boolean{
    return this._isAdd;
  }
  get formSubmit():boolean{
    return this._formSubmit;
  }
  get commentModel():CommentModel{
    return this._comment;
  }
}
