import { Injectable } from '@angular/core';
import { AngularFirebaseCrudService, QueryModel } from 'angular-firebase-crud';
import { SubCommentModel } from '../models/subcomment.model';
import { Statics } from '../statics/statics';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentSubcommentService {

  constructor(private firebaseService:AngularFirebaseCrudService) { }

  insertCommentSubComment(subCommentModel:SubCommentModel):Observable<any>{
    return new Observable((observe)=>{
      this.isCommentSubCommentHave(subCommentModel).subscribe((isCommentSubCommentHave:boolean)=>{
        if(!isCommentSubCommentHave){
          this.firebaseService.insert(Statics.ApiPath.commentSubCommentPath,subCommentModel.toJson()).subscribe(res=>(observe.next(res),observe.complete()),error=>observe.error(error));
        }else{
          observe.next("The commnet-subComment you want to add already exists..");
          observe.complete();
        }
      },error=>observe.error(error));
    });
  }
  getCommentSubComment(...filters:Array<QueryModel>):Observable<any>{
    return new Observable((observe)=>{
      this.firebaseService.get(Statics.ApiPath.commentSubCommentPath,...filters).subscribe(result=>{
        let commentSubCommentList=new Array();
        result.forEach(e=>{
          commentSubCommentList.push(new SubCommentModel(e.commentid,e.subcommentid));
        });
        observe.next(commentSubCommentList);
        observe.complete();
      },error=>observe.error(error));
    });
  }
  updateCommentSubComment(subCommentModel:SubCommentModel,...filters:Array<QueryModel>):Observable<any>{
    return new Observable((observe)=>{
      this.firebaseService.update(Statics.ApiPath.commentSubCommentPath,subCommentModel.toJson(),...filters).subscribe(result=>(observe.next(result),observe.complete()),error=>observe.error(error));
    });
  }
  deleteCommentSubComment(...filters:Array<QueryModel>):Observable<any>{
    return new Observable((observe)=>{
      this.firebaseService.delete(Statics.ApiPath.commentSubCommentPath,...filters).subscribe(result=>(observe.next(result),observe.complete()),error=>observe.error(error));
    });
  }
  private isCommentSubCommentHave(subCommentModel:SubCommentModel):Observable<boolean>{
    return new Observable((observe)=>{
      this.getCommentSubComment().subscribe(commentSubCommentList=>{
        commentSubCommentList.forEach(e => {
              if(subCommentModel.commentId==e.commentid&&subCommentModel.subCommentId==e.subcommentid){
                observe.next(true);
                observe.complete();
              }else{
                observe.next(false);
                observe.complete();
              }
          });
          commentSubCommentList.length==0?observe.next(false):null;
          observe.complete();
      },error=>observe.error(error));
    });
  }
}
