export class ArchiveModel{

    private _id:number;
    private _date:Date;

    constructor(id:number,date:Date){
        this._id=id;
        this._date=date;
    }
    toJson(){
        return{
            id:this._id,
            date:this._date,
        }
    }
    get id():number{
        return this._id
    }
    get date():Date{
        return this._date;
    }
    set id(id:number){
        this._id=id;
    }
}