import { Component, EventEmitter, Input, OnInit, Output, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { CategoryModel } from '../core/models/category.model';
import { CategoryService } from '../core/services/category.service';
import { ActiveCategoryService } from './active-category.service';
import { Loader } from '../shared/loader/loader-creator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  private _categoryList:Array<CategoryModel>;
  private _activeCategoryList:Array<CategoryModel>;
  
  constructor(private categoryService:CategoryService,private activeCategoryService:ActiveCategoryService,private viewContainerRef:ViewContainerRef,private componentFactoryResolver:ComponentFactoryResolver) { 
    this._activeCategoryList=new Array();
    this._categoryList=new Array();
  }

  ngOnInit(): void {
    let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
    this.categoryService.getCategory().subscribe((categoryList:Array<CategoryModel>)=>(this._categoryList=categoryList,loader.deleteLoader()),err=>console.log(err));
  }
  checkInCategory(category:CategoryModel){
    return this._activeCategoryList!=undefined?this._activeCategoryList.includes(category):false;
  }
  setActiveCategory(category:CategoryModel){
    if(this._activeCategoryList.includes(category)){
      this._activeCategoryList=this._activeCategoryList.filter(item=>item!=category);
    }else{
      this._activeCategoryList.push(category);
    }
    this.activeCategoryService.setActiveCategoryList(this._activeCategoryList);
  }
  get categoryList():Array<CategoryModel>{
    return this._categoryList;
  }
}
