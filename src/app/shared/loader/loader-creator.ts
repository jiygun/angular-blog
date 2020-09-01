import { ComponentFactoryResolver, ViewContainerRef, ComponentRef } from "@angular/core";
import { LoaderComponent } from "./loader.component";

export class Loader{

    private _component:ComponentRef<LoaderComponent>;
    private _componentFactoryResolver:ComponentFactoryResolver;
    private _viewContainerRef:ViewContainerRef;
    constructor(viewContainerRef:ViewContainerRef,componentFactoryResolver:ComponentFactoryResolver){
        this._componentFactoryResolver=componentFactoryResolver;
        this._viewContainerRef=viewContainerRef;
        this.createLoader();
    }
    private createLoader(){
        let factory=this._componentFactoryResolver.resolveComponentFactory(LoaderComponent);
        this._component = factory.create(this._viewContainerRef.parentInjector);
        this._viewContainerRef.insert(this._component.hostView);
    }
    deleteLoader(){
      this._viewContainerRef.remove(0);
    }
    set viewContainerRef(viewContainerRef:ViewContainerRef){
        this._viewContainerRef=viewContainerRef;
    }
    set componentFactoryResolver(componentFactoryResolver:ComponentFactoryResolver){
        this._componentFactoryResolver=componentFactoryResolver;
    }
}