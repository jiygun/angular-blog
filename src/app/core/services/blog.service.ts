import { Injectable } from '@angular/core';
import { AngularFirebaseCrudService, QueryModel } from 'angular-firebase-crud';
import { BlogModel } from "../models/blog.model";
import { BlogCategoryArchiveModel } from '../models/blogcatarc.model';
import { Statics } from '../statics/statics';
import { BlogCategoryArchiveService } from './blog-archive-category.service';
import { CommentService } from './comment.service';
import { Observable, forkJoin } from 'rxjs';
import { ArchiveService } from './archive.service';
import { ArchiveModel } from '../models/archive.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private firebaseService:AngularFirebaseCrudService,private blogCategoryArchiveService:BlogCategoryArchiveService,private commentService:CommentService) { }
  addBlog(blogModel:BlogModel,categoryId:number,archiveId:number):Observable<any>{
    return new Observable((observe)=>{
      this.firebaseService.get(Statics.ApiPath.blogPath,new QueryModel("orderBy","id","desc")).subscribe((blogs:Array<any>)=>{
        blogs.length==0?blogModel.id=1:blogModel.id=(blogs[0].id+1);
        this.blogCategoryArchiveService.addBlogCategoryArchive(new BlogCategoryArchiveModel(blogModel.id,categoryId,archiveId)).subscribe(res=>{
          this.firebaseService.insert(Statics.ApiPath.blogPath,blogModel.toJson()).subscribe(res=>(observe.next(res),observe.complete()),error=>observe.error(error));
        });
        /*this.archiveService.addArchive(new ArchiveModel(null,blogModel.date)).subscribe((archiveModel:ArchiveModel)=>{
        });*/
      },error=>observe.error(error));
    });
  }
  getBlogWithById(blogId:number):Observable<BlogModel>{
    return new Observable((observe)=>{
      this.firebaseService.get(Statics.ApiPath.blogPath,new QueryModel("where","id","==",blogId)).subscribe((res:Array<any>)=>{
        if(res.length==0)observe.next(null);
        else if(res.length>0)observe.next(new BlogModel(res[0].id,res[0].title,res[0].head,res[0].author,res[0].picture,res[0].date.toDate(),res[0].contents));
        else observe.next();
        observe.complete();
      },error=>observe.error(error));
    });
  }
  getBlogList(categoryList:Array<number>,archiveList:Array<number>):Observable<Array<BlogModel>>{
    return new Observable((observe)=>{
      this.blogCategoryArchiveService.getBlogCategoryArchiveList(new QueryModel("orderBy","blogid","desc"),categoryList.length>0?new QueryModel("where","categoryid","in",categoryList):new QueryModel("orderBy","categoryid","asc")).subscribe((blogCategoryArchiveList:Array<BlogCategoryArchiveModel>)=>{

        blogCategoryArchiveList.length==0?(observe.next(new Array()),observe.complete()):null;
        const blogListObservables=new Array();
        this.clearCummon(blogCategoryArchiveList).forEach((blogCategoryArchiveModel:BlogCategoryArchiveModel) => {
          if(archiveList.length>0?archiveList.includes(blogCategoryArchiveModel.archiveId):true){
            blogListObservables.push(this.getBlogWithById(blogCategoryArchiveModel.blogId));
          }
        });
        if(blogListObservables.length==0){observe.next(new Array());observe.complete()}
        forkJoin(blogListObservables).subscribe((res:Array<BlogModel>)=>{
          observe.next(res);
          observe.complete();
        },error=>observe.error(error));
      },error=>observe.error(error));
    });
  }
  private clearCummon(blogCategoryArchiveList:Array<BlogCategoryArchiveModel>){
    const clearedList:Array<BlogCategoryArchiveModel>=new Array();
    blogCategoryArchiveList.reduce((result,item)=>{
      if(!result.includes(item.blogId)){
        result==undefined?result=new Array():null;
        result.push(item.blogId);
        clearedList.push(item);
      }
      return result;
    },[]);
    return clearedList;
  }
  updateBlog(blogModel:BlogModel,...filters:Array<QueryModel>):Observable<any>{
    return new Observable((observe)=>{
      this.firebaseService.update(Statics.ApiPath.blogPath,blogModel.toJson(),...filters).subscribe(result=>(observe.next(result),observe.complete()),error=>observe.error(error));
    });
  }
  deleteBlog(blogId:number):Observable<any>{
    return new Observable((observe)=>{
      this.commentService.deleteCommentWithBlogId(blogId).subscribe(res=>{
        this.blogCategoryArchiveService.deleteBlogCategoryArchiveWithBlogId(blogId).subscribe(res=>{
          this.firebaseService.delete(Statics.ApiPath.blogPath,new QueryModel("where","id","==",blogId)).subscribe(result=>(observe.next(result),observe.complete()),error=>observe.error(error));
        })
      },error=>observe.error(error));
    });
  }
}
