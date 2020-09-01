import { CommentModel } from './comment.model';

export class Comment extends CommentModel{
    private _subComments:Array<CommentModel>;
    constructor(commentId?:number,name?:string,email?:string,date?:Date,content?:string,subComments?:Array<CommentModel>){
        super(commentId,name,email,date,content);
        this._subComments=subComments;
    }
    get subComments():Array<CommentModel>{
        return this._subComments;
    }
}