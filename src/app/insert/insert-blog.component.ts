import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { BlogModel } from '../core/models/blog.model';
import { NgForm } from '@angular/forms';
import { CategoryModel } from '../core/models/category.model';
import { BlogService } from '../core/services/blog.service';
import { CategoryService } from '../core/services/category.service';
import { QueryModel } from 'angular-firebase-crud';
import { Router } from '@angular/router';
import { Loader } from '../shared/loader/loader-creator';
import { ArchiveService } from '../core/services/archive.service';
import { ArchiveModel } from '../core/models/archive.model';

@Component({
  selector: 'app-insert-blog',
  templateUrl: './insert-blog.component.html',
  styleUrls: ['./insert-blog.component.scss']
})
export class InsertBlogComponent implements OnInit {
  
  private _blogModel:BlogModel;
  categoryId:string;
  private _isSubmit:boolean;

  private _paragraphs:Array<any>;
  private _categories:Array<CategoryModel>;


  constructor(private blogService:BlogService,private categoryService:CategoryService,private archiveService:ArchiveService,private router:Router,private viewContainerRef:ViewContainerRef,private componentFactoryResolver:ComponentFactoryResolver) {
    this._blogModel=new BlogModel();
    this._blogModel.contents=new Array<any>();
    this._isSubmit=false;
  }

  ngOnInit(): void {
    let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
    this.categoryService.getCategory(new QueryModel("orderBy","id","asc")).subscribe((categoryList:Array<CategoryModel>)=>(this._categories=categoryList,loader.deleteLoader()));
    this._paragraphs=new Array();
  }
  submit(form:NgForm){
    this._isSubmit=true;
    if(form.valid){
      this.addBlog();
      this._isSubmit=false;
    }
  }
  addBlog(){
    this.blogModel.date=new Date(this.blogModel.date);
    let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
    this.archiveService.addArchive(new ArchiveModel(null,new Date(this.blogModel.date))).subscribe((archiveModel:ArchiveModel)=>{
      this.blogService.addBlog(this._blogModel,parseInt(this.categoryId),archiveModel.id).subscribe(res=>(loader.deleteLoader(),this.router.navigate(['/admin'])));
    });
  }
  addContents(){
    this.blogModel.contents.push(this.blogModel.contents[this._paragraphs.length]);
    this._paragraphs.push(this._paragraphs.length);
  }
  errors(ngModel,key?){
    let errors=new Array();
    let ctrlName:string=ngModel.description|| key;
    if(ngModel.errors){
      for(let error in ngModel.errors){
        switch(error){
          case "required": 
            errors.push(`Dude, fill ${ctrlName}!`);
            break;
          case "minlength": 
            errors.push(`Dude, ${ctrlName} too short!`);
            break;
          case "pattern": 
            errors.push(`Dude, let's go to the moon with ${ctrlName}!`);
            break;
        }
      }
    }
    return errors;
  }
  getErrors(form:NgForm){
    let errors=new Array();
    Object.keys(form.controls).forEach(e=>{
      this.errors(form.controls[e],e).forEach(m=>errors.push(m));
    })
    return errors;
  }
  get blogModel():BlogModel{
    return this._blogModel;
  }
  get paragraphs(){
    return this._paragraphs;
  }
  get categories():Array<CategoryModel>{
    return this._categories;
  }
  get isSubmit():boolean{
    return this._isSubmit;
  }
}
