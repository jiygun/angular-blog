import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveService } from "./services/archive.service";
import { BlogService } from "./services/blog.service";
import { CategoryService } from "./services/category.service";
import { CommentService } from "./services/comment.service";
import { CommentBlogService } from "./services/comment-blog.service";
import { CommentSubcommentService } from "./services/comment-subcomment.service";
import { BlogCategoryArchiveService } from "./services/blog-archive-category.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    ArchiveService,
    BlogService,
    CategoryService,
    CommentService,
    CommentBlogService,
    BlogCategoryArchiveService,
    CommentSubcommentService
  ]
})
export class CoreModule { }
