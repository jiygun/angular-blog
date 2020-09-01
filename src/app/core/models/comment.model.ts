export class CommentModel{
    private _id:number;
    private _name:string;
    private _email:string;
    private _date:Date;
    private _content:string;

    constructor(commentId?:number,name?:string,email?:string,date?:Date,content?:string){
        this._id=commentId;
        this._name=name;
        this._email=email;
        this._content=content;
        this._date=date;
    }
    toJson(){
        return{
            id:this._id,
            name:this._name,
            date:this._date,
            email:this._email,
            content:this._content
        }
    }
    get id():number{
        return this._id;
    }
    get name():string{
        return this._name;
    }
    get email():string{
        return this._email;
    }
    get date():Date{
        return this._date;
    }
    get content():string{
        return this._content;
    }
    set id(id:number){
        this._id=id;
    }    
    set name(name:string){
        this._name=name;
    }
    set email(email:string){
        this._email=email;
    }
    set date(date:Date){
        this._date=date;
    }
    set content(content:string){
        this._content=content;
    }
}