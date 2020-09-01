import { Injectable } from '@angular/core';
import { AngularFirebaseCrudService, QueryModel } from 'angular-firebase-crud';
import { CategoryModel } from "../models/category.model";
import { Statics } from '../statics/statics';
import { Observable, forkJoin } from 'rxjs';
import { BlogCategoryArchiveService } from './blog-archive-category.service';
import { BlogCategoryArchiveModel } from '../models/blogcatarc.model';
import { BlogService } from './blog.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firebaseService:AngularFirebaseCrudService,private blogCategoryArchiveService:BlogCategoryArchiveService,private blogService:BlogService) { }
  addCategory(categoryModel:CategoryModel):Observable<any>{
    return new Observable((observe)=>{
      this.isCategoryHave(categoryModel.categoryName).subscribe((isCategoryHave:boolean)=>{
        if(!isCategoryHave){
          this.firebaseService.get(Statics.ApiPath.categoryPath,new QueryModel("orderBy","id","desc")).subscribe((categories:Array<any>)=>{
            categories.length==0?categoryModel.id=1:categoryModel.id=(categories[0].id+1);
            this.firebaseService.insert(Statics.ApiPath.categoryPath,categoryModel.toJson()).subscribe(res=>(observe.next(res),observe.complete()),error=>observe.error(error));
          },error=>observe.error(error));
        }else{
          observe.next("The category you want to add already exists..");
          observe.complete();
        }
      },error=>observe.error(error));
    });
  }
  getCategory(...filters:Array<QueryModel>):Observable<Array<CategoryModel>>{
    return new Observable((observe)=>{
        this.firebaseService.get(Statics.ApiPath.categoryPath,...filters).subscribe(result=>{
            let categoryList=new Array();
            result.forEach(e=>{
              categoryList.push(new CategoryModel(e.id,e.categoryname));
            });
            observe.next(categoryList);
            observe.complete();
        },error=>observe.error(error));
    });
  }
  updateCategory(categoryModel:CategoryModel,...filters:Array<QueryModel>):Observable<any>{
    return new Observable((observe)=>{
      this.firebaseService.update(Statics.ApiPath.categoryPath,categoryModel.toJson(),...filters).subscribe(result=>(observe.next(result),observe.complete()),error=>observe.error(error));
    });
  }
  deleteCategory(categoryId:number):Observable<any>{
    return new Observable((observe)=>{
      this.blogCategoryArchiveService.getBlogCategoryArchiveList(new QueryModel("where","categoryid","==",categoryId)).subscribe((blogCategoryArchiveList:Array<BlogCategoryArchiveModel>)=>{
        if(blogCategoryArchiveList.length==0){
          this.firebaseService.delete(Statics.ApiPath.categoryPath,new QueryModel("where","id","==",categoryId)).subscribe(result=>(observe.next(result),observe.complete()),error=>observe.error(error));
        }
        const blogDeleteList=new Array();
        blogCategoryArchiveList.forEach((e:BlogCategoryArchiveModel) => {
          blogDeleteList.push(this.blogService.deleteBlog(e.blogId));
        });
        forkJoin(blogDeleteList).subscribe(res=>{
          this.blogCategoryArchiveService.deleteBlogCategoryArchiveWithCategoryId(categoryId).subscribe(res=>{
            this.firebaseService.delete(Statics.ApiPath.categoryPath,new QueryModel("where","id","==",categoryId)).subscribe(result=>(observe.next(result),observe.complete()),error=>observe.error(error));
          });
        });
      });
    });
  }
  private isCategoryHave(categoryName:string):Observable<boolean>{
    return new Observable((observe)=>{
      this.getCategory().subscribe(categoryList=>{
        categoryList.forEach(e => {
              if(categoryName==e.categoryName){
                observe.next(true);
                observe.complete();
              }else{
                observe.next(false);
                observe.complete();
              }
          });
          categoryList.length==0?observe.next(false):null;
          observe.complete();
      },error=>observe.error(error));
    });
  }
}
