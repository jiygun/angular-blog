import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  private _isClose:boolean;

  @Output() isAccept=new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }
  isDenial(bool:boolean){
    this._isClose=bool;
    this.isAccept.emit(bool);
  }
  isClose(){
    return (!this._isClose?"alert--close":"");
  }
}
