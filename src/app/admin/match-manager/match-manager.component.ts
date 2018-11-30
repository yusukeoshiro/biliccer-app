import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { FirebaseService } from '../../firebase.service';
import { Team } from '../../models/team.model';
import { Match } from '../../models/match.model';
declare var M;


@Component({
  selector: 'app-match-manager',
  templateUrl: './match-manager.component.html',
  styleUrls: ['./match-manager.component.css']
})
export class MatchManagerComponent implements OnInit {

  matches: Array<Match> = new Array();
  teams: Array<Team> = new Array();
  selectedMatch: Match;
  modal;

  constructor(public db: AngularFirestore, private firebaseService: FirebaseService) {
    db.collection('teams').snapshotChanges()
    .subscribe( (data) => {
      // console.log(  );
      this.teams = new Array();
      for ( const team of data) {
        this.teams.push( new Team(team.payload.doc) );
      }
    });
    
    db.collection('matches', ref => ref.orderBy('created_at')).snapshotChanges()
    .subscribe( (data) => {
      this.matches = new Array();
      for ( const doc of data) {
        console.log(doc);
        this.matches.push( new Match( db, doc.payload.doc, this.teams ) );
      }
      console.log(this.matches);
    });
  }

  onMatchSelected(match: Match) {
    this.selectedMatch = match;
    this.modal.open();
  }

  onMatchWon (match, winningTeam) {
    match.setWinner( winningTeam );
  }

  onMatchReset (match) {
    match.reset();
  }
  
  onMatchStart (match) {
    match.start();
  }

  onMatchDelete (match) {
    if (confirm('Are you sure?')) {
      match.delete();
    }    
  }

  ngOnInit() {
    document.addEventListener('DOMContentLoaded', () => {
      this.modal = M.Modal.init(document.getElementById('modal1'));
    });  
  }

}
