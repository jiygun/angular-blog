export class SubCommentModel{
    private _commentId:number;
    private _subCommentId:number;

    constructor(commentId?:number,subCommentId?:number){
        this._commentId=commentId;
        this._subCommentId=subCommentId;
    }
    toJson(){
        return{
            commentid:this._commentId,
            subcommentid:this._subCommentId
        }
    }
    public get commentId():number{
        return this._commentId;
    }
    public get subCommentId():number{
        return this._subCommentId;
    }
    public set commentId(commentId:number){
        this._commentId=commentId;
    }    
    public set subCommentId(subCommentId:number){
        this._subCommentId=subCommentId;
    }
}

export class SubComment extends SubCommentModel{
    private _subList:Array<SubCommentModel>;
    constructor(commentId?:number,subCommentId?:number,subList?:Array<SubCommentModel>){
        super(commentId,subCommentId);
        this._subList=subList;
    }
    public get subList(){
        return this._subList;
    }
    public set subList(subList){
        this._subList=subList;
    }    
}