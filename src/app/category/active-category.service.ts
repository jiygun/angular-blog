import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryModel } from '../core/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ActiveCategoryService {

  private _activeCategoryListSource:BehaviorSubject<Array<CategoryModel>>;
  private _activeCategoryList:Observable<Array<CategoryModel>>;

  constructor() { 
    this._activeCategoryListSource=new BehaviorSubject(new Array());
    this._activeCategoryList=this._activeCategoryListSource.asObservable();
  }

  setActiveCategoryList(archiveList:Array<CategoryModel>){
    this._activeCategoryListSource.next(archiveList);
  }
  get activeCategoryList():Observable<Array<CategoryModel>>{
    return this._activeCategoryList;
  }
}
