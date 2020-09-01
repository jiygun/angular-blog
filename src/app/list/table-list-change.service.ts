import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableListChangeService {

  private _itemListChangedSource:BehaviorSubject<boolean>;
  private _isListChanged:Observable<boolean>;

  constructor() { 
    this._itemListChangedSource=new BehaviorSubject(false);
    this._isListChanged=this._itemListChangedSource.asObservable();
  }

  listIsChanged(isChange:boolean){
    this._itemListChangedSource.next(isChange);
  }
  get isListChanged():Observable<boolean>{
    return this._isListChanged;
  }
}
