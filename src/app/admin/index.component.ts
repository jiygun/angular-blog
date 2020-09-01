import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { IconDefinition, faBell, faUser, faFileAlt, faArchive, faList, faComments } from '@fortawesome/free-solid-svg-icons';
import { BlogModel } from '../core/models/blog.model';
import { CategoryModel } from '../core/models/category.model';
import { ArchiveModel } from '../core/models/archive.model';
import { CommentModel } from '../core/models/comment.model';
import { BlogService } from '../core/services/blog.service';
import { CategoryService } from '../core/services/category.service';
import { ArchiveService } from '../core/services/archive.service';
import { CommentService } from '../core/services/comment.service';
import { QueryModel } from 'angular-firebase-crud';
import { Loader } from '../shared/loader/loader-creator';
import { TableListChangeService } from '../list/table-list-change.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  private _blogList:Array<BlogModel>;
  private _categoryList:Array<CategoryModel>;
  private _archiveList:Array<ArchiveModel>;
  private _commentList:Array<CommentModel>;

  private _blogLength:number;
  private _categoryLength:number;
  private _archiveLength:number;
  private _commentLength:number;

  private _blogTitle:string;
  private _categoryTitle:string;
  private _archiveTitle:string;
  private _commentTitle:string;

  private _faBell:IconDefinition;
  private _faUser:IconDefinition;
  private _faFileAlt:IconDefinition;
  private _faArchive:IconDefinition;
  private _faComments:IconDefinition;
  private _faList:IconDefinition;

  constructor(private tableListChangedService:TableListChangeService,private blogService:BlogService,private categoryService:CategoryService,private archiveService:ArchiveService,private commentService:CommentService,private viewContainerRef:ViewContainerRef,private componentFactoryResolver:ComponentFactoryResolver) { 
    this._blogList=new Array();
    this._categoryList=new Array();
    this._archiveList=new Array();
    this._commentList=new Array();

    this._blogTitle="Blog List";
    this._categoryTitle="Category List";
    this._archiveTitle="Archive List";
    this._commentTitle="Comment List";

    this._faBell=faBell;
    this._faUser=faUser;
    this._faFileAlt=faFileAlt;
    this._faArchive=faArchive;
    this._faComments=faComments;
    this._faList=faList;
  }

  ngOnInit(): void {
    this.tableListChangedService.isListChanged.subscribe((isChange:boolean)=>{
      this.getBlogList();
      this.getCategoryList();
      this.getArchiveList();
      this.getCommentList();
    });
  }
  private getBlogList(){
    let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
    this.blogService.getBlogList(new Array(),new Array()).subscribe((blogList:Array<BlogModel>)=>{
      this._blogList=blogList;
      this._blogLength=blogList.length;
      loader.deleteLoader();
    });
  }
  private getCategoryList(){
    let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
    this.categoryService.getCategory(new QueryModel("orderBy","id","asc")).subscribe((categoryList:Array<CategoryModel>)=>{
      this._categoryList=categoryList;
      this._categoryLength=categoryList.length;
      loader.deleteLoader();
    });
  }
  private getArchiveList(){
    let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
    this.archiveService.getArchive().subscribe((archiveList:Array<ArchiveModel>)=>{
      this._archiveList=archiveList;
      this._archiveLength=archiveList.length;
      loader.deleteLoader();
    });
  }
  private getCommentList(){
    let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
    this.commentService.getComment().subscribe((commentList:Array<CommentModel>)=>{
      this._commentList=commentList;
      this._commentLength=commentList.length;
      loader.deleteLoader();
    });
  }
  get blogTitle():string{
    return this._blogTitle;
  }
  get categoryTitle():string{
    return this._categoryTitle;
  }
  get archiveTitle():string{
    return this._archiveTitle;
  }
  get commentTitle():string{
    return this._commentTitle;
  }
  get faBell():IconDefinition{
    return this._faBell;
  }
  get faUser():IconDefinition{
    return this._faUser;
  }
  get faFileAlt():IconDefinition{
    return this._faFileAlt;
  }
  get faArchive():IconDefinition{
    return this._faArchive;
  }
  get faComments():IconDefinition{
    return this._faComments;
  }
  get faList():IconDefinition{
    return this._faList;
  }
  get blogList():Array<BlogModel>{
    return this._blogList;
  }
  get categoryList():Array<CategoryModel>{
    return this._categoryList;
  }
  get archiveList():Array<ArchiveModel>{
    return this._archiveList;
  }
  get commentList():Array<CommentModel>{
    return this._commentList;
  }
  get blogLength():number{
    return this._blogLength;
  }
  get categoryLength():number{
    return this._categoryLength;
  }
  get archiveLength():number{
    return this._archiveLength;
  }
  get commentLength():number{
    return this._commentLength;
  }
}
