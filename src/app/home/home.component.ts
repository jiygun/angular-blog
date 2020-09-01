import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { mapTo } from 'rxjs/operators';
import { interval, merge } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private fireStore:AngularFirestore) { }

  ngOnInit(): void {

  }

  

}
