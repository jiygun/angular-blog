import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ArchiveModel } from '../core/models/archive.model';

@Injectable({
  providedIn: 'root'
})
export class ActiveArchiveService {

  private _activeArchiveListSource:BehaviorSubject<Array<ArchiveModel>>;
  private _activeArchiveList:Observable<Array<ArchiveModel>>;

  constructor() { 
    this._activeArchiveListSource=new BehaviorSubject(new Array());
    this._activeArchiveList=this._activeArchiveListSource.asObservable();
  }

  setActiveArchiveList(archiveList:Array<ArchiveModel>){
    this._activeArchiveListSource.next(archiveList);
  }
  get activeArchiveList():Observable<Array<ArchiveModel>>{
    return this._activeArchiveList;
  }
}
