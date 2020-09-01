import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ArchiveModel } from '../core/models/archive.model';
import { ArchiveService } from '../core/services/archive.service';
import { ActiveArchiveService } from './active-archive.service';
import { Loader } from '../shared/loader/loader-creator';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  private _archiveList:Array<ArchiveModel>;
  private _activeArchiveList:Array<ArchiveModel>;

  constructor(private archiveService:ArchiveService,private activeArchiveService:ActiveArchiveService,private viewContainerRef:ViewContainerRef,private componentFactoryResolver:ComponentFactoryResolver) { 
    this._activeArchiveList=new Array();
    this._archiveList=new Array();
  }
  ngOnInit(): void {
    let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
    this.archiveService.getArchive().subscribe((archiveList:Array<ArchiveModel>)=>(this._archiveList=archiveList,loader.deleteLoader()),err=>console.log(err));
  }
  checkInArchive(archive:ArchiveModel){
    return this._activeArchiveList!=undefined?this._activeArchiveList.includes(archive):false;
  }
  setActiveArchive(archive:ArchiveModel){
    if(this._activeArchiveList.includes(archive)){
      this._activeArchiveList=this._activeArchiveList.filter(item=>item!=archive);
    }else{
      this._activeArchiveList.push(archive);
    }
    this.activeArchiveService.setActiveArchiveList(this._activeArchiveList);
  }
  get archiveList():Array<ArchiveModel>{
    return this._archiveList;
  }
}
