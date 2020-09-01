export class CategoryModel{
    private _id:number;
    private _categoryName:string;

    constructor(id?:number,categoryName?:string){
        this._id=id;
        this._categoryName=categoryName;
    }
    toJson(){
        return{
            id:this._id,
            categoryname:this._categoryName,
        }
    }
    get id():number{
        return this._id
    }
    get categoryName():string{
        return this._categoryName;
    }
    set id(id:number){
        this._id=id;
    }
    set categoryName(categoryName:string){
        this._categoryName=categoryName;
    }
}