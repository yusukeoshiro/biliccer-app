import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { FirebaseService } from '../../firebase.service';
import { AngularFireFunctions } from '@angular/fire/functions';
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

  constructor(public db: AngularFirestore, private firebaseService: FirebaseService, private fns: AngularFireFunctions) {

    db.collection('teams').snapshotChanges()
    .subscribe( (data) => {
      // console.log(  );
      this.teams = new Array();
      for ( const team of data) {
        this.teams.push( Team.makeTeam(team.payload.doc) );
      }
    });
    
    db.collection('matches', ref => ref.orderBy('created_at')).snapshotChanges()
    .subscribe( (data) => {
      this.matches = new Array();
      for ( const doc of data) {
        console.log(doc);
        const match = new Match( db, doc.payload.doc, this.teams, fns )
        if ( this.selectedMatch && this.selectedMatch.id === match.id ) {
          this.selectedMatch = match;
        }
        this.matches.push( match );
      }
      console.log(this.matches);
    });
  }

  onMatchSelected(match: Match) {
    this.selectedMatch = match;
    this.modal.open();
  }

  onMatchWon (match, winningTeam) {
    if ( match.status === 'Finished' ) {
      alert('The is already finished');
      return;
    }

    if ( match.status !== 'In Progress...' ) {
      alert('Please start the match before setting the winner');
      return;
    }

    if (confirm('Are you sure?')) {
      match.setWinner( winningTeam, function() {
        alert( `winner is set to ${winningTeam.name}` );
      });
  
    }
  }

  onMatchReset (match) {
    if (confirm('Are you sure?')) {
      match.reset(function(){
        alert('Reset complete');
      });  
    }
  }
  
  onMatchStart (match) {
    if (confirm('Are you sure?')) {
      match.start(function() {
        alert('Match started!');
      });
    }    
  }

  onMatchDelete (match) {
    if (confirm('Are you sure?')) {
      match.delete(function() {
        alert('Match deleted!');
      });
    }
  }


  ngOnInit() {
    document.addEventListener('DOMContentLoaded', () => {
      this.modal = M.Modal.init(document.getElementById('modal1'));
    });  
  }

}
