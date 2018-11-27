import { Match } from './match.model';

export class Team {
  public id: String;
  public name: String;
  public winCount: Number;
  public matches: Array<Match>;
  constructor ( doc ) {
    this.id = doc.id;
    this.name = doc.data().name;
    this.winCount = doc.data().win_count;
    this.matches = new Array();
  }

  playCount () {
    return this.matches.length;
  };
}