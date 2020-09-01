export class BlogModel{
    private _id:number;
    private _title:string;
    private _head:string;
    private _author:string;
    private _picPath:string;
    private _date:Date;
    private _contents:Array<any>;
    
    constructor(id?:number,title?:string,head?:string,author?:string,imagePath?:string,date?:Date,contents?:Array<string>){
        this._id=id;
        this._title=title;
        this._head=head;
        this._author=author;
        this._picPath=imagePath;
        this._date=date;
        this._contents=contents;
    }
    toJson(){
        return{
            id:this._id,
            title:this._title,
            head:this._head,
            author:this._author,
            picture:this._picPath,
            date:this._date,
            contents:this._contents
        }
    }
    get id():number{
        return this._id;
    }
    get head():string{
        return this._head;
    }
    get author():string{
        return this._author;
    }
    get title():string{
        return this._title;
    }
    get imagePath():string{
        return this._picPath;
    }
    get date():Date{
        return this._date;
    }
    get contents():Array<any>{
        return this._contents;
    }
    set id(id:number){
        this._id=id;
    }
    set head(head:string){
        this._head=head;
    }
    set author(author:string){
        this._author=author;
    }
    set title(title:string){
        this._title=title;
    }
    set imagePath(imagePath:string){
        this._picPath=imagePath;
    }
    set date(date:Date){
        this._date=date;
    }
    set contents(contents:Array<any>){
        this._contents=contents;
    }
}