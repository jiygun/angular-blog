import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { IconDefinition, faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { Loader } from '../shared/loader/loader-creator';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  private _faUser:IconDefinition;
  private _faKey:IconDefinition;

  eMail:string;
  password:string;

  constructor(private authenticationService:AuthenticationService,public router: Router,private viewContainerRef:ViewContainerRef,private componentFactoryResolver:ComponentFactoryResolver) { 
    this._faUser=faUser;
    this._faKey=faKey;
  }

  ngOnInit(): void {
  }
  login(){
    let loader =new Loader(this.viewContainerRef,this.componentFactoryResolver);
    this.authenticationService.SignIn(this.eMail,this.password).then(r=>(this.router.navigate(['admin']),loader.deleteLoader()));
  }
  get faUser(): IconDefinition{
    return this._faUser;
  }
  get faKey(): IconDefinition{
    return this._faKey;
  }
}
