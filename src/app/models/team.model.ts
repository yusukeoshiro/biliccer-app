import { Match } from './match.model';
import { User } from './user.model';
import { FirebaseService } from '../firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';

export class Team {
  public id: string;
  public name: string;
  public winCount: number;
  public matches: Array<Match>;
  public members: Array<User>;

  constructor (private db?: AngularFirestore) { }

  public static makeTeam( doc, db?: AngularFirestore ) {
    let team;
    if ( db ) {
      team = new Team(db);
    } else {
      team = new Team();
    }
    team.id = doc.id;
    team.name = doc.data().name;
    team.winCount = doc.data().win_count;
    team.matches = new Array();
    team.members = new Array();
    for ( const member of (doc.data().members || []) ) {
      team.members.push( User.makeUserFromObject(member) );      
    }
    return team;
  }

  public containsMember (userId: string) {
    for (const member of this.members) {
      if ( userId === member.uid ) {
        return true;
      }
    }
    return false;
  }

  public addMember ( user: User ) {
    const tempMembers = new Array();
    console.log('1')
    for (const member of this.members) {
      tempMembers.push( member.serialize() )
      console.log('2')
    }    
    tempMembers.push( user.serialize() )
    console.log('3')
    const item = {
      members: tempMembers
    };
    this.db.collection('teams').doc(this.id).update(item);
  }

  public removeMember ( user: User ) {
    console.log( user );
    const tempMembers = new Array();
    for (const member of this.members) {
      if ( member.uid !== user.uid) {
        tempMembers.push( member.serialize() )
      }      
    }
    const item = {
      members: tempMembers
    };
    console.log( item );
    this.db.collection('teams').doc(this.id).update(item);
  }

  

  public playCount () {
    return this.matches.length;
  };
}