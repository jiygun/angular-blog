import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveArchiveService } from '../archive/active-archive.service';
import { ActiveCategoryService } from '../category/active-category.service';
import { ArchiveModel } from '../core/models/archive.model';
import { BlogModel } from '../core/models/blog.model';
import { CategoryModel } from '../core/models/category.model';
import { BlogService } from '../core/services/blog.service';
import { Loader } from '../shared/loader/loader-creator';

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.scss']
})
export class BloglistComponent implements OnInit {

  private MAX_BLOG:number=8;

  private _blogList:Array<BlogModel>;
  private _totalPage:number;

  private activeArchiveList:Array<number>;
  private activeCategoryList:Array<number>;
  
  constructor(private activatedRoute:ActivatedRoute,private blogService:BlogService,private activeArchiveService:ActiveArchiveService,private activeCategoryService:ActiveCategoryService,private viewContainerRef:ViewContainerRef,private componentFactoryResolver:ComponentFactoryResolver) { 
    this._blogList=new Array();
    this.activeArchiveList=new Array();
    this.activeCategoryList=new Array();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((result:any)=>{
      this.activeArchiveService.activeArchiveList.subscribe((activeArchiveList:Array<ArchiveModel>)=>{
        let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
        this.activeArchiveList=activeArchiveList.reduce((result,item)=>{return result.includes(item.id)?result:[...result,item.id];},[]);
        this.blogService.getBlogList(this.activeCategoryList,this.activeArchiveList).subscribe((blogList:Array<BlogModel>)=>{
          this._blogList=blogList;
          this._totalPage=Math.ceil(blogList.length/this.MAX_BLOG);
          loader.deleteLoader();
        });
      });
      this.activeCategoryService.activeCategoryList.subscribe((activeCategoryList:Array<CategoryModel>)=>{
        let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
        this.activeCategoryList=activeCategoryList.reduce((result,item)=>{return result.includes(item.id)?result:[...result,item.id];},[]);
        this.blogService.getBlogList(this.activeCategoryList,this.activeArchiveList).subscribe((blogList:Array<BlogModel>)=>{
          this._blogList=blogList;
          this._totalPage=Math.ceil(blogList.length/this.MAX_BLOG);
          loader.deleteLoader();
        });
      });
    });
  }
  activePage($event){
    
  }
  get blogList():Array<BlogModel>{
    return this._blogList;
  }
  get totalPage():number{
    return this._totalPage;
  }
}
