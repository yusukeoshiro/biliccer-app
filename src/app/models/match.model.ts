import { Team } from './team.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { FirebaseService } from '../firebase.service';

export class Match {
  public id: String;
  public team1: Team;
  public team2: Team;
  public status: String;
  public winner: Team;

  isInvolved(team) {
    return this.team1.id === team.id || this.team2.id === team.id
  }

  getOpponent(team) {
    if ( this.team1.id === team.id ) {
      return this.team2;
    } else {
      return this.team1;
    }
  }

  serialize () {
    const item = {
      created_at: new Date().valueOf(),
      status: this.status,
      team1: {
        id: this.team1.id,
        name: this.team1.name
      },
      team1_bets: 0,
      team1_betters: [],
      team2: {
        id: this.team2.id,
        name: this.team2.name
      },
      team2_bets: 0,
      team2_betters: []
    }
    return item;
  }

  insert(){
    const item = this.serialize();
    const id = this.db.createId();
    this.db.collection('matches').doc(id).set(item);
  }

  constructor (private db?: AngularFirestore, doc?, teams?) {
    if ( doc ) {
      this.id = doc.id;
      this.status = doc.data().status;
      for( const team of teams ) {
        if ( team.id === doc.data().team1.id ) {
          this.team1 = team;
          team.matches.push(this);
        }
        if ( team.id === doc.data().team2.id ) {
          this.team2 = team;
          team.matches.push(this);
        }
        if ( team.id === doc.data().winner_id ) {
          this.winner = team;
        }
      }
    } else {
      this.status = 'Stand by';
    }
  }
}