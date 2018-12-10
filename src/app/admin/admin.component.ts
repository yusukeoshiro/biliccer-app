import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { Team } from '../models/team.model';
import { Match } from '../models/match.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private db: AngularFirestore, private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  createMatch() {
    const teams: Array<Team> = new Array();
    const matches: Array<Match> = new Array();
    this.db.collection('teams').get().subscribe(
      (data) => {
        for(const doc of data.docs) {
          teams.push( Team.makeTeam(doc) );
        }

        this.db.collection('matches').get().subscribe(
          (data) => {
            for(const doc of data.docs){
              matches.push( new Match(this.db, doc, teams) );
            }
            // console.log(matches);
            const team1 = this.getLeastPlayedTeam(teams);
            // console.log( team1 );
            const team2 = this.getOptimalOpponent(team1, teams);
            const match = new Match(this.db);

            match.team1 = team1;
            match.team2 = team2;
            match.insert();
          }
        )
      }
    );
  }

  getLeastPlayedTeam (teams) {
    teams.sort(
      (a,b) => {
        return a.playCount() - b.playCount();
      }
    );
    let maxIndex = teams.length - 1;
    for ( let i = 0; i < teams.length; i++ ) {
      if ( teams[i].playCount() !== teams[0].playCount() ) {
        maxIndex = i - 1;
        break;
      }
    }
    const randomIndex = Math.round( Math.random() * maxIndex );
    return teams[randomIndex];
  }

  getOptimalOpponent (team, teams) {
    const playCountHash = {};
    for ( const t of teams ) {
      if ( team.id !== t.id ) {
        // console.log(t);
        const obj = {
          id: t.id,
          directMatch: 0,
          playCount: t.playCount()
        };
        // console.log( obj );
        // console.log( '----' );
        playCountHash[t.id] = obj;
      }
    }
    // console.log( playCountHash );

    for ( const match of team.matches ) {
      const opponent = match.getOpponent( team );
      playCountHash[opponent.id].directMatch++;
    }


    const opponents = new Array();
    for ( const key of Object.keys(playCountHash) ) {
      opponents.push( playCountHash[key] );
    }

    opponents.sort(
      (a,b) => {
        if ( a.playCount !== b.playCount ) {
          return a.playCount - b.playCount;
        } else {
          return a.directMatch - b.directMatch;
        }
      }
    );

    // console.log( opponents );

    let maxIndex = opponents.length - 1;
    for ( let i = 0; i < opponents.length; i++ ) {
      if ( (opponents[i].directMatch !== opponents[0].directMatch) || (opponents[i].playCount !== opponents[0].playCount) ) {
        maxIndex = i - 1;
        break;
      }
    }

    const randomIndex = Math.round( Math.random() * maxIndex );
    for ( const team of teams ) {
      if ( team.id === opponents[randomIndex].id ) {
        return team;
      }
    }
  }


}
