export class CommentBlogModel{
    private _commentId:number;
    private _blogId:number;

    constructor(commentId?:number,blogId?:number){
        this._commentId=commentId;
        this._blogId=blogId;
    }
    toJson(){
        return{
            commentid:this._commentId,
            blogid:this._blogId
        }
    }
    public get commentId():number{
        return this._commentId;
    }
    public get blogId():number{
        return this._blogId;
    }
    public set commentId(commentId:number){
        this._commentId=commentId;
    }    
    public set blogId(blogId:number){
        this._blogId=blogId;
    }
}