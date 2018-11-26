import { Component, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class FirebaseService {
  private firebase: any;
  private firestore: any;
  public user: any;
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
                this.user = {
                  email: user.email,
                  displayName: user.displayName,
                  uid: user.uid,
                  win_count: 0
                };
                this.loggedIn.emit( this.user );
                angularFirestore.collection('users').doc(this.user.uid).set(this.user);
              } else {
                this.user = {
                  email: data.data().email,
                  displayName: data.data().displayName,
                  uid: data.id,
                  win_count: data.data().win_count
                };
                this.loggedIn.emit( user );
              }
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