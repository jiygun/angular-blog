import { Component, OnInit, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { BlogService } from '../core/services/blog.service';
import { CategoryService } from '../core/services/category.service';
import { ArchiveService } from '../core/services/archive.service';
import { CommentService } from '../core/services/comment.service';
import { BlogModel } from '../core/models/blog.model';
import { CategoryModel } from '../core/models/category.model';
import { ArchiveModel } from '../core/models/archive.model';
import { CommentModel } from '../core/models/comment.model';
import { Comment } from '../core/models/comment';
import { Loader } from '../shared/loader/loader-creator';
import { TableListChangeService } from './table-list-change.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {

  @Input() tableHead:string;
  @Input() itemList:Array<any>;
  
  constructor(private tableListChangedService:TableListChangeService,private blogService:BlogService,private categoryService:CategoryService,private archiveService:ArchiveService,private commentService:CommentService,private viewContainerRef:ViewContainerRef,private componentFactoryResolver:ComponentFactoryResolver) { }

  ngOnInit(): void {
  }
  deleteItem(item:any){
    item.constructor.name=="BlogModel"?this.deleteBlog((item as BlogModel)):item.constructor.name=="CategoryModel"?this.deleteCategory((item as CategoryModel)):
    item.constructor.name=="ArchiveModel"?this.deleteArchive((item as ArchiveModel)):this.deleteComment((item as Comment));
  }
  private deleteBlog(blogModel:BlogModel){
    let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
    this.blogService.deleteBlog(blogModel.id).subscribe(res=>{
      this.tableListChangedService.listIsChanged(true);
      loader.deleteLoader();
    });
  }
  private deleteCategory(categoryModel:CategoryModel){
    let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
    this.categoryService.deleteCategory(categoryModel.id).subscribe(res=>{
      this.tableListChangedService.listIsChanged(true);
      loader.deleteLoader();
    });
  }
  private deleteArchive(archiveModel:ArchiveModel){
    let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
    this.archiveService.deleteArchive(archiveModel.id).subscribe(res=>{
      this.tableListChangedService.listIsChanged(true);
      loader.deleteLoader();
    });
  }
  private deleteComment(commentModel:CommentModel){
    let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
    this.commentService.deleteComment(commentModel.id).subscribe(res=>{
      this.tableListChangedService.listIsChanged(true);
      loader.deleteLoader();
    });
  }
}
