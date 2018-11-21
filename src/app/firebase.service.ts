import { Component, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class FirebaseService {
  private firebase: any;
  private firestore: any;

  constructor() {
    // console.log('test');
    // console.log(this.firebase);
    // .subscribe((data) => {
    //   console.log(data);
    // })
  }
}