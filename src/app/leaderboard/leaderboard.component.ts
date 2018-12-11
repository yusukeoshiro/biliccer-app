import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';
import { User } from '../models/user.model';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  teams: Array<any> = new Array();
  users: Array<any> = new Array();

  constructor(db: AngularFirestore) {

    db.collection('teams', ref => ref.orderBy('win_count', 'desc')).snapshotChanges().subscribe(
      (data) => {
        this.teams = new Array();
        for ( const team of data) {
          this.teams.push( Team.makeTeam(team.payload.doc) );
        }        
      }
    );

    db.collection('users', ref => ref.orderBy('win_count', 'desc')).snapshotChanges().subscribe( 
      (data) => {
        this.users = new Array();
        for ( const user of data) {
          this.users.push( User.makeUser(user.payload.doc) );
        }
      }
    );
  }

  ngOnInit() {
  }

}
