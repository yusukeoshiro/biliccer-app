import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Array<any> = new Array();

  constructor(db: AngularFirestore) {
    db.collection('teams', ref => ref.orderBy('name', 'asc')).snapshotChanges()
      .subscribe( (data) => {
        this.teams = new Array();
        for ( const team of data) {
          this.teams.push( Team.makeTeam(team.payload.doc ));
        }
      })
  }

  ngOnInit() { }
}
