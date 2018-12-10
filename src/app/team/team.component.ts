import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  team: Team = undefined;
  users: Array<User> = new Array();

  constructor( private route: ActivatedRoute, private db: AngularFirestore ) {
    const id = this.route.snapshot.params['id'];    
    console.log( id );
    db.collection('teams').doc(id).get().subscribe(
      (doc) => {
        this.team = Team.makeTeam( doc, db );
      }
    );

    db.collection('users').snapshotChanges()
      .subscribe( (data) => {
        this.users = new Array();
        for ( const user of data) {
          this.users.push( User.makeUser(user.payload.doc) );
        }
      })

  }


  onMemberAdd (team: Team, user: User) {
    team.addMember(user);
  }
  onMemberRemove (team: Team, user: User) {
    team.removeMember(user);
  }
  ngOnInit() {
    
    
    
  }

}
