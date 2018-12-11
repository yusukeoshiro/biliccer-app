export class User {
  public uid: string;
  public displayName: string;
  public email: string;
  public winCount: number;
  public photoUrl: string;

  constructor ( ) { }

  public static makeUser( doc ) {
    console.log(doc);
    const user = new User();
    user.uid = doc.id;
    user.displayName = doc.data().display_name;
    user.winCount = doc.data().win_count;
    user.email = doc.data().email;
    user.photoUrl = doc.data().photo_url;        
    return user;
  }

  public static makeUserFromObject(obj) {
    const user = new User();
    user.uid = obj.uid;
    user.displayName = obj.display_name;
    user.winCount = obj.win_count;
    user.email = obj.email;
    user.photoUrl = obj.photo_url;        
    return user;
  }



  serialize () {
    return {
      uid: this.uid,
      display_name: this.displayName,
      win_count: this.winCount,
      email: this.email,
      photo_url: this.photoUrl,
    };
  }
}

