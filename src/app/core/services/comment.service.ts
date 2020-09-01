import { Injectable } from '@angular/core';
import { AngularFirebaseCrudService, QueryModel } from 'angular-firebase-crud';
import { Statics } from '../statics/statics';
import { CommentModel } from "../models/comment.model";
import { Comment } from "../models/comment";
import { CommentBlogService } from './comment-blog.service';
import { CommentSubcommentService } from './comment-subcomment.service';
import { SubCommentModel } from '../models/subcomment.model';
import { CommentBlogModel } from '../models/commentblog.model';
import { Observable, forkJoin, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private firebaseService:AngularFirebaseCrudService,private commentBlogService:CommentBlogService,private commentSubCommentService:CommentSubcommentService) { }

  addComment(commentModel:CommentModel,blogId:number,commentId:number):Observable<any>{
    return new Observable((observe)=>{
      this.getComment(new QueryModel("orderBy","id","desc")).subscribe((commentList:Array<CommentModel>)=>{
        commentList.length==0?commentModel.id=1:commentModel.id=(commentList[0].id+1);
        if(blogId!=null&&blogId!=undefined){
          this.addBlogComment(commentModel,blogId).subscribe(res=>(observe.next(res),observe.complete()),err=>observe.error(err));
        }else if(commentId!=null&&commentId!=undefined){
          this.addSubComment(commentModel,commentId).subscribe(res=>(observe.next(res),observe.complete()),err=>observe.error(err));
        }else{
          observe.error("Wrong Paramaters..");
        }
      });
    });
  }
  private addBlogComment(commentModel:CommentModel,blogId:number):Observable<any>{
    return new Observable((observe)=>{
      this.commentBlogService.insertCommentBlog(new CommentBlogModel(commentModel.id,blogId)).subscribe(result=>{
        this.firebaseService.insert(Statics.ApiPath.commentPath,commentModel.toJson()).subscribe(res=>(observe.next(res),observe.complete()),err=>observe.error(err))
      },err=>observe.error(err));
    });
  }
  private addSubComment(commentModel:CommentModel,commentId:number):Observable<any>{
    return new Observable((observe)=>{
      this.commentSubCommentService.insertCommentSubComment(new SubCommentModel(commentId,commentModel.id)).subscribe(result=>{
        this.firebaseService.insert(Statics.ApiPath.commentPath,commentModel.toJson()).subscribe(res=>(observe.next(res),observe.complete()),err=>observe.error(err));
      },err=>observe.error(err));
    });
  }
  getComment(...filters:Array<QueryModel>):Observable<any>{
    return new Observable((observe)=>{
      this.firebaseService.get(Statics.ApiPath.commentPath,...filters).subscribe(result=>{
        let commentList=new Array();
        result.forEach(e=>{
          commentList.push(new Comment(e.id,e.name,e.email,new Date(),e.content));
        });
        observe.next(commentList);
        observe.complete();
      },error=>observe.error(error));
    });
  }
  getCommentWithBlogId(blogId:number):Observable<Array<Comment>>{
    return new Observable((observe)=>{
      this.commentBlogService.getCommentBlog(new QueryModel("where","blogid","==",blogId)).subscribe((commentBlogList:Array<CommentBlogModel>)=>{
        const commentList=new Array();
        commentBlogList.forEach((commentBlog:CommentBlogModel) => {
          commentList.push(this.getCommentWithByCommentId(commentBlog.commentId));
        });
        if(commentBlogList.length==0){observe.next(new Array());observe.complete();}
        forkJoin(commentList).subscribe((res:Array<Comment>)=>(observe.next(res),observe.complete()),err=>observe.error(err));
      });
    });
  }
  getCommentWithByCommentId(commentId:number):Observable<Comment>{
    return new Observable((observe)=>{
      this.firebaseService.get(Statics.ApiPath.commentPath,new QueryModel("where","id","==",commentId)).subscribe((comment:any)=>{
        comment.forEach(e => {
          this.getSubComments(commentId).subscribe(subCommentList=>{
            observe.next(new Comment(e.id,e.name,e.email,new Date(),e.content,subCommentList));
            observe.complete();
          },error=>observe.error(error))
        });
      },error=>observe.error(error));
    });
  }
  private getSubComments(commentId:number):Observable<Array<Comment>>{
    return new Observable((observe)=>{
      this.commentSubCommentService.getCommentSubComment(new QueryModel("where","commentid","==",commentId)).subscribe((comSubList:Array<SubCommentModel>)=>{
        const subCommentList=new Array();
        comSubList.forEach((e:SubCommentModel) => {
          subCommentList.push(this.getCommentWithByCommentId(e.subCommentId));
        });
        comSubList.length==0?(observe.next(),observe.complete):null;
        forkJoin(subCommentList).subscribe((res:Array<Comment>)=>(observe.next(res),observe.complete()),err=>observe.error(err));
      });
    });
  }
  updateComment(commentModel:CommentModel,...filters:Array<QueryModel>):Observable<any>{
    return new Observable((observe)=>{
      this.firebaseService.update(Statics.ApiPath.commentPath,commentModel.toJson(),...filters).subscribe(result=>(observe.next(result),observe.complete()),error=>observe.error(error));
    });
  }
  deleteCommentWithBlogId(blogId:number){
    return new Observable((observe)=>{
      this.commentBlogService.getCommentBlog(new QueryModel("where","blogid","==",blogId)).subscribe((commentBlogList:Array<CommentBlogModel>)=>{
        if(commentBlogList.length==0) {observe.next(); observe.complete();};
        const observables=new Array();
        commentBlogList.forEach((commentBlog:CommentBlogModel) => {
          observables.push(this.deleteCommentWithCommentId(commentBlog.commentId));
        });
        forkJoin(observables).subscribe(res=>{
          this.commentBlogService.deleteCommentBlog(new QueryModel("where","blogid","==",blogId)).subscribe(r=>{
            observe.next(r);
            observe.complete();
          })
        },err=>observe.error(err));
      });
    });
  }
  private deleteCommentWithCommentId(commentId:number):Observable<any>{
    return new Observable((observe)=>{
      this.commentSubCommentService.getCommentSubComment(new QueryModel("where","commentid","==",commentId)).subscribe((subCommentList:Array<SubCommentModel>)=>{
        if(subCommentList.length==0) {
          this.firebaseService.delete(Statics.ApiPath.commentPath,new QueryModel("where","id","==",commentId)).subscribe(res=>{
            observe.next(res);
            observe.complete();
          },error=>observe.error(error));
        }
        const observables=new Array();
        subCommentList.forEach((subComment:SubCommentModel) => {
          observables.push(this.deleteCommentWithCommentId(subComment.subCommentId));
          observables.push(this.commentSubCommentService.deleteCommentSubComment(new QueryModel("where","commentid","==",subComment.commentId),new QueryModel("where","subcommentid","==",subComment.subCommentId)));
        });
        forkJoin(observables).subscribe(res=>{
          this.firebaseService.delete(Statics.ApiPath.commentPath,new QueryModel("where","id","==",commentId)).subscribe(res=>{
            observe.next(res);
            observe.complete();
          })
        },error=>observe.error(error));
      });
    });
  }
  deleteComment(commentId:number){
    return new Observable((observe)=>{
      forkJoin(this.commentBlogService.getCommentBlog(new QueryModel("where","commentid","==",commentId)),
      this.commentSubCommentService.getCommentSubComment(new QueryModel("where","commentid","==",commentId)),
      this.commentSubCommentService.getCommentSubComment(new QueryModel("where","subcommentid","==",commentId))).subscribe(([commentBlog,commentSub,commentSubWithCom])=>{
        forkJoin(this.deleteCommentWithCommentId(commentId),
        commentBlog.length!=0?this.commentBlogService.deleteCommentBlog(new QueryModel("where","commentid","==",commentId)):of(null),
        commentSubWithCom.length!=0?this.commentSubCommentService.deleteCommentSubComment(new QueryModel("where","subcommentid","==",commentId)):of(null)).subscribe(res=>{
          observe.next(res);
          observe.complete();
        });
      });
    });
  }
}
