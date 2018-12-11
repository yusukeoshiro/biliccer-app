import { Component, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './models/user.model';

@Injectable()
export class FirebaseService {
  private firebase: any;
  private firestore: any;
  public user: User;
  public loggedIn = new EventEmitter<any>();
  public loggedOut = new EventEmitter<any>();

  constructor( public afAuth: AngularFireAuth, private angularFirestore: AngularFirestore ) {
    this.user = undefined;
    afAuth.authState.subscribe(
      (user) => {
        if (user) {
          const userRef = angularFirestore.collection('users').doc(user.uid);
          userRef.get().subscribe(
            (data) => {
              if ( !data.exists ) {
                this.user = new User();
                this.user.email = user.email;
                this.user.displayName = user.displayName;
                this.user.uid = user.uid;
                this.user.winCount = 0;
                this.user.photoUrl = user.photoURL;
                angularFirestore.collection('users').doc(this.user.uid).set(this.user.serialize());
              } else {
                this.user = User.makeUser(data);
                
              }
              this.loggedIn.emit( this.user );
            }
          );
        } else {
          this.user = undefined;
          this.loggedOut.emit();
        }
      }
    );
    // afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}