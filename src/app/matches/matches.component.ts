import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { FirebaseService } from '../firebase.service';
// import firebase = require('firebase');


@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  matches: Array<any> = new Array();
  myBets:Array<any> = new Array();
  subscription: Subscription;

  constructor(private db: AngularFirestore, private firebaseService: FirebaseService) {
    // console.log('test');
    db.collection('matches', ref => ref.orderBy('created_at')).snapshotChanges()
      .subscribe( (data) => {
        console.log( 'matches fetched...' );
        this.matches = new Array();
        for ( const match of data) {
          const element = match.payload.doc.data();
          element['id'] = match.payload.doc.id;
          this.matches.push( element );
        }
      });

    if ( firebaseService.user === undefined ) {
      firebaseService.loggedIn.subscribe(
        (user) => {
          // console.log( user.uid );
          this.subscription = db.collection('bets', ref => ref.where('user_id', '==', user.uid)).snapshotChanges()
          .subscribe(
            (data) => {
              this.myBets = new Array();
              for ( const bet of data ) {
                const element = bet.payload.doc.data();
                element['id'] = bet.payload.doc.id;
                this.myBets.push( element );
              }
            }
          );
          firebaseService.loggedOut.subscribe(
            () => { this.subscription.unsubscribe(); }
          );
        }
      );
    } else {
      this.subscription = db.collection('bets', ref => ref.where('user_id', '==', firebaseService.user.uid)).snapshotChanges()
      .subscribe(
        (data) => {
          this.myBets = new Array();
          for ( const bet of data ) {
            const element = bet.payload.doc.data();
            element['id'] = bet.payload.doc.id;
            this.myBets.push( element );
          }
        }
      );
      firebaseService.loggedOut.subscribe(
        () => { this.subscription.unsubscribe(); }
      );
    }


  }

  placeBet(matchId: string, winnerTeamId: string) {
    if ( this.firebaseService.user === undefined ) {
      alert('Please login to bet!');
    } else {
      // console.log( matchId );
      // console.log( winnerTeamId );
      const item = {
        'match_id': matchId,
        'user_id': this.firebaseService.user.uid,
        'bet_team': winnerTeamId
      };
      const id = matchId + ':' + this.firebaseService.user.uid;
      this.db.collection('bets').doc(id).set(item);


      // increment the bet count
      const matchesRef = this.db.firestore.collection('matches').doc(matchId);
      this.db.firestore.runTransaction((transaction) => {
        return new Promise((resolve) => {
          transaction.get(matchesRef)
            .then((doc) => {
              if ( doc.data().team1.id === winnerTeamId ) {
                const newCount = doc.data().team1_bets + 1;
                transaction.update(doc.ref, {
                  team1_bets: newCount
                });
              } else {
                const newCount = doc.data().team2_bets + 1;
                transaction.update(doc.ref, {
                  team2_bets: newCount
                });
              }
              resolve();
            })
        });
      })
      .then(() => console.log('ok'))
      .catch(e => console.error('failed', e));
    }
  }

  alreadyBetted ( match ) {

  }

  getBettedTeam ( match ) {
    for ( const bet of this.myBets ) {
      if ( bet.match_id === match.id ) {
        return bet.bet_team;
      }
    }
    return null;
  }

  ngOnInit() {
  }

}
