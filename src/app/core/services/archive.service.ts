import { Injectable } from '@angular/core';
import { AngularFirebaseCrudService, QueryModel } from 'angular-firebase-crud';
import { ArchiveModel } from "../models/archive.model";
import { Statics } from "../statics/statics";
import { Observable, forkJoin } from 'rxjs';
import { BlogCategoryArchiveService } from './blog-archive-category.service';
import { BlogCategoryArchiveModel } from '../models/blogcatarc.model';
import { BlogService } from './blog.service';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  constructor(private firebaseService:AngularFirebaseCrudService,private blogCategoryArchiveService:BlogCategoryArchiveService,private blogService:BlogService) { }
  addArchive(archiveModel:ArchiveModel):Observable<ArchiveModel>{
    return new Observable((observe)=>{
      this.isArchiveHave(archiveModel.date).subscribe((resultArchiveModel:ArchiveModel)=>{
        if(resultArchiveModel==null&&resultArchiveModel==undefined){
          this.firebaseService.get(Statics.ApiPath.archivePath,new QueryModel("orderBy","id","desc")).subscribe((archives:Array<any>)=>{
            archives.length==0?archiveModel.id=1:archiveModel.id=(archives[0].id+1);
            this.firebaseService.insert(Statics.ApiPath.archivePath,archiveModel.toJson()).subscribe(res=>(observe.next(archiveModel),observe.complete()),error=>observe.error(error));
          },error=>observe.error(error));
        }else{
          observe.next(resultArchiveModel);
          observe.complete()
        }
      },error=>observe.error(error));
    });
  }
  getArchive(...filters:Array<QueryModel>):Observable<Array<ArchiveModel>>{
    return new Observable((observe)=>{
        this.firebaseService.get(Statics.ApiPath.archivePath,...filters).subscribe(result=>{
            let archiveList=new Array();
            result.forEach(e=>{
              archiveList.push(new ArchiveModel(e.id,e.date.toDate()));
            });
            observe.next(archiveList);
            observe.complete();
        },error=>observe.error(error));
    });
  }
  updateArchive(archiveModel:ArchiveModel,...filters:Array<QueryModel>):Observable<any>{
    return new Observable((observe)=>{
      this.firebaseService.update(Statics.ApiPath.archivePath,archiveModel.toJson(),...filters).subscribe(result=>(observe.next(result),observe.complete()),error=>observe.error(error));
    });
  }
  deleteArchive(archiveId:number):Observable<any>{
    return new Observable((observe)=>{
      this.blogCategoryArchiveService.getBlogCategoryArchiveList(new QueryModel("where","archiveid","==",archiveId)).subscribe((blogCategoryArchiveList:Array<BlogCategoryArchiveModel>)=>{
        if(blogCategoryArchiveList.length==0){
          this.firebaseService.delete(Statics.ApiPath.archivePath,new QueryModel("where","id","==",archiveId)).subscribe(result=>(observe.next(result),observe.complete()),error=>observe.error(error));
        }
        const blogDeleteList=new Array();
        blogCategoryArchiveList.forEach((e:BlogCategoryArchiveModel) => {
          blogDeleteList.push(this.blogService.deleteBlog(e.blogId));
        });
        forkJoin(blogDeleteList).subscribe(res=>{
          this.blogCategoryArchiveService.deleteBlogCategoryArchiveWithArchiveId(archiveId).subscribe(res=>{
            this.firebaseService.delete(Statics.ApiPath.archivePath,new QueryModel("where","id","==",archiveId)).subscribe(result=>(observe.next(result),observe.complete()),error=>observe.error(error));
          });
        });
      });
      this.firebaseService.delete(Statics.ApiPath.archivePath,new QueryModel("where","id","==",archiveId)).subscribe(result=>(observe.next(result),observe.complete()),error=>observe.error(error));
    });
  }
  private isArchiveHave(date:Date):Observable<ArchiveModel>{
    return new Observable((observe)=>{
      this.getArchive().subscribe(archiveList=>{
          archiveList.forEach(e => {
              if(date.getMonth()==e.date.getMonth()&&date.getFullYear()==e.date.getFullYear()){
                observe.next(new ArchiveModel(e.id,e.date));
                observe.complete();
              }else{
                observe.next(null);
                observe.complete();
              }
          });
          archiveList.length==0?observe.next(null):null;
          observe.complete();
      },error=>observe.error(error));
    });
  }
}
