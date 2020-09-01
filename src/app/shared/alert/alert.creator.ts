import { ComponentFactoryResolver, ComponentRef, ViewContainerRef } from "@angular/core";
import { AlertComponent } from "./alert.component";

export class Alert{

    private _component:ComponentRef<AlertComponent>;
    private _componentFactoryResolver:ComponentFactoryResolver;
    private _viewContainerRef:ViewContainerRef;

    constructor(viewContainerRef:ViewContainerRef,componentFactoryResolver:ComponentFactoryResolver){
        this._componentFactoryResolver=componentFactoryResolver;
        this._viewContainerRef=viewContainerRef;
        this.createAlert();
    }
    private createAlert(){
        let factory=this._componentFactoryResolver.resolveComponentFactory(AlertComponent);
        this._component = factory.create(this._viewContainerRef.parentInjector);
        this._viewContainerRef.insert(this._component.hostView);
        this._component.instance.isAccept.subscribe((result:boolean)=>{
        result?this._viewContainerRef.clear():this._viewContainerRef.clear();
        });
    }
    set viewContainerRef(viewContainerRef:ViewContainerRef){
      this._viewContainerRef=viewContainerRef;
    }
    set componentFactoryResolver(componentFactoryResolver:ComponentFactoryResolver){
      this._componentFactoryResolver=componentFactoryResolver;
    }
}