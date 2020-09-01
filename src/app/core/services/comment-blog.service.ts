import { Injectable } from '@angular/core';
import { AngularFirebaseCrudService, QueryModel } from 'angular-firebase-crud';
import { CommentBlogModel } from "../models/commentblog.model";
import { Statics } from '../statics/statics';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentBlogService {
  constructor(private firebaseService:AngularFirebaseCrudService) { }
  insertCommentBlog(commentBlogModel:CommentBlogModel):Observable<any>{
    return new Observable((observe)=>{
      this.isCommentBlogHave(commentBlogModel).subscribe((isCommentBlogHave:boolean)=>{
        if(!isCommentBlogHave){
          this.firebaseService.insert(Statics.ApiPath.commentBlogPath,commentBlogModel.toJson()).subscribe(res=>(observe.next(res),observe.complete()),error=>observe.error(error));
        }else{
          observe.error("The commnet-blog you want to add already exists..");
        }
      },error=>observe.error(error));
    });
  }
  getCommentBlog(...filters:Array<QueryModel>):Observable<any>{
    return new Observable((observe)=>{
      this.firebaseService.get(Statics.ApiPath.commentBlogPath,...filters).subscribe(result=>{
        let commentBlogList=new Array();
        result.forEach(e=>{
          commentBlogList.push(new CommentBlogModel(e.commentid,e.blogid));
        });
        observe.next(commentBlogList);
        observe.complete();
      },error=>observe.error(error));
    });
  }
  updateCommentBlog(commentBlogModel:CommentBlogModel,...filters:Array<QueryModel>):Observable<any>{
    return new Observable((observe)=>{
      this.firebaseService.update(Statics.ApiPath.commentBlogPath,commentBlogModel.toJson(),...filters).subscribe(result=>(observe.next(result),observe.complete()),error=>observe.error(error));
    });
  }
  deleteCommentBlog(...filters:Array<QueryModel>):Observable<any>{
    return new Observable((observe)=>{
      this.firebaseService.delete(Statics.ApiPath.commentBlogPath,...filters).subscribe(result=>(observe.next(result),observe.complete()),error=>observe.error(error));
    });
  }
  private isCommentBlogHave(commentBlogModel:CommentBlogModel):Observable<boolean>{
    return new Observable((observe)=>{
      this.getCommentBlog().subscribe(commentBlogList=>{
        commentBlogList.forEach(e => {
              if(commentBlogModel.blogId==e.blogid&&commentBlogModel.commentId==e.commentid){
                observe.next(true);
                observe.complete();
              }else{
                observe.next(false);
                observe.complete();
              }
          });
          commentBlogList.length==0?observe.next(false):null;
          observe.complete();
      },error=>observe.error(error));
    });
  }
}
