export class BlogCategoryArchiveModel{
    private _blogId:number;
    private _categoryId:number;
    private _archiveId:number;
    constructor(blogId:number,categoryId:number,archiveId:number) {
        this._blogId=blogId;
        this._categoryId=categoryId;
        this._archiveId=archiveId;
    }
    toJson(){
        return{
            archiveid :this._archiveId,
            blogid:this._blogId,
            categoryid:this._categoryId
        }
    }
    get blogId():number{
        return this._blogId;
    }
    get categoryId():number{
        return this._categoryId;
    }
    get archiveId():number{
        return this._archiveId;
    }
}