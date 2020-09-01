import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { CategoryService } from '../core/services/category.service';
import { Router } from '@angular/router';
import { CategoryModel } from '../core/models/category.model';
import { Loader } from '../shared/loader/loader-creator';

@Component({
  selector: 'app-insert-category',
  templateUrl: './insert-category.component.html',
  styleUrls: ['./insert-category.component.scss']
})
export class InsertCategoryComponent implements OnInit {

  private _isSubmit:boolean;
  private _categoryModel:CategoryModel;

  constructor(private router:Router,private categoryService:CategoryService,private viewContainerRef:ViewContainerRef,private componentFactoryResolver:ComponentFactoryResolver) {
    this._isSubmit=false;
    this._categoryModel=new CategoryModel();
  }

  ngOnInit(): void {

  }
  submit(form){
    this._isSubmit=true;
    if(form.valid){
      this._isSubmit=false;
      this.addCategory();
    }
  }
  addCategory(){
    let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
    this.categoryService.addCategory(this._categoryModel).subscribe(res=>(loader.deleteLoader(),this.router.navigate(['/admin'])));
  }
  get categoryModel():CategoryModel{
    return this._categoryModel;
  }
  get isSubmit():boolean{
    return this._isSubmit;
  }
}
