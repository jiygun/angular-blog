import { Injectable } from '@angular/core';
import { AngularFirebaseCrudService, QueryModel } from 'angular-firebase-crud';
import { BlogCategoryArchiveModel } from "../models/blogcatarc.model";
import { Statics } from "../statics/statics";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogCategoryArchiveService {
  constructor(private firebaseService:AngularFirebaseCrudService) { }
  addBlogCategoryArchive(blogCategoryArchiveModel:BlogCategoryArchiveModel):Observable<any>{
    return new Observable((observe)=>{
      this.isBlogCategoryArchiveHave(blogCategoryArchiveModel).subscribe((isBlogCategoryArchiveHave:boolean)=>{
        if(!isBlogCategoryArchiveHave){
          this.firebaseService.insert(Statics.ApiPath.blogCategoryArchivePath,blogCategoryArchiveModel.toJson()).subscribe(res=>(observe.next(res),observe.complete()),error=>observe.error(error));
        }else{
          observe.next("The blog-archive-category you want to add already exists..");
          observe.complete();
        }
      },error=>observe.error(error));
    });
  }
  getBlogCategoryArchiveList(...filters:Array<QueryModel>):Observable<Array<BlogCategoryArchiveModel>>{
    return new Observable((observe)=>{
        this.firebaseService.get(Statics.ApiPath.blogCategoryArchivePath,...filters).subscribe(result=>{
            let blogCategoryArchiveList=new Array();
            result.forEach(e=>{
                blogCategoryArchiveList.push(new BlogCategoryArchiveModel(e.blogid,e.categoryid,e.archiveid));
            });
            observe.next(blogCategoryArchiveList);
            observe.complete();
        },error=>observe.error(error));
    });
  }
  updateBlogCategoryArchive(blogCategoryArchiveModel:BlogCategoryArchiveModel,...filters:Array<QueryModel>):Observable<any>{
    return new Observable((observe)=>{
      this.firebaseService.update(Statics.ApiPath.blogCategoryArchivePath,blogCategoryArchiveModel.toJson(),...filters).subscribe(result=>(observe.next(result),observe.complete()),error=>observe.error(error));
    });
  }
  deleteBlogCategoryArchive(blogCategoryArchiveModel:BlogCategoryArchiveModel):Observable<any>{
    return new Observable((observe)=>{
      this.firebaseService.delete(Statics.ApiPath.blogCategoryArchivePath,new QueryModel("where","blogid","==",blogCategoryArchiveModel.blogId),new QueryModel("where","categoryid","==",blogCategoryArchiveModel.categoryId),new QueryModel("where","archiveid","==",blogCategoryArchiveModel.archiveId)).subscribe(result=>(observe.next(result),observe.complete()),error=>observe.error(error));
    });
  }
  deleteBlogCategoryArchiveWithBlogId(blogId:number):Observable<any>{
    return new Observable((observe)=>{
      this.firebaseService.delete(Statics.ApiPath.blogCategoryArchivePath,new QueryModel("where","blogid","==",blogId)).subscribe(result=>(observe.next(result),observe.complete()),error=>observe.error(error));
    });
  }
  deleteBlogCategoryArchiveWithCategoryId(categoryId:number):Observable<any>{
    return new Observable((observe)=>{
      this.firebaseService.delete(Statics.ApiPath.blogCategoryArchivePath,new QueryModel("where","categoryid","==",categoryId)).subscribe(result=>(observe.next(result),observe.complete()),error=>observe.error(error));
    });
  }
  deleteBlogCategoryArchiveWithArchiveId(archiveId:number):Observable<any>{
    return new Observable((observe)=>{
      this.firebaseService.delete(Statics.ApiPath.blogCategoryArchivePath,new QueryModel("where","archiveid","==",archiveId)).subscribe(result=>(observe.next(result),observe.complete()),error=>observe.error(error));
    });
  }
  private isBlogCategoryArchiveHave(blogCategoryArchiveModel:BlogCategoryArchiveModel):Observable<boolean>{
    return new Observable((observe)=>{
      this.getBlogCategoryArchiveList().subscribe(blogCategoryArchiveList=>{
        blogCategoryArchiveList.forEach(e => {
              if(blogCategoryArchiveModel.blogId==e.blogId&&blogCategoryArchiveModel.archiveId==e.archiveId&&blogCategoryArchiveModel.categoryId==e.categoryId){
                observe.next(true);
                observe.complete();
              }else{
                observe.next(false);
                observe.complete();
              }
          });
          blogCategoryArchiveList.length==0?observe.next(false):null;
          observe.complete();
      },error=>observe.error(error));
    });
  }
}
