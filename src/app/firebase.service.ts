import { Component, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable()
export class FirebaseService {
  private firebase: any;
  private firestore: any;
  public user: any;

  constructor( public afAuth: AngularFireAuth ) {
    this.user = undefined;
    afAuth.authState.subscribe(
      (data) => {
        if (data) {
          this.user = {
            email: data.email,
            displayName: data.displayName,
            uid: data.uid
          }
        } else {
          this.user = undefined;
        }
      }
    );
    // afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}