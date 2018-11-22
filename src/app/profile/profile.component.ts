import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {



  constructor( public firebaseService: FirebaseService ) { }

  ngOnInit() {
  }

  signin() {
    this.firebaseService.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());    
  }
  signout() {
    this.firebaseService.afAuth.auth.signOut();
  }
 
}
