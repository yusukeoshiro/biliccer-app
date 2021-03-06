import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';

import { Routes, RouterModule } from '@angular/router';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MatchesComponent } from './matches/matches.component';
import { BetsComponent } from './bets/bets.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './team/team.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { FirebaseService } from './firebase.service';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { MatchManagerComponent } from './admin/match-manager/match-manager.component';


const appRoutes: Routes = [
  { path: '', component: TeamsComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'matches', component: MatchesComponent },
  { path: 'bets', component: BetsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'teams/:id', component: TeamComponent },
  { path: 'admin', component: AdminComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeaderboardComponent,
    MatchesComponent,
    BetsComponent,
    TeamsComponent,
    TeamComponent,
    ProfileComponent,
    AdminComponent,
    MatchManagerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireFunctionsModule,
  ],
  providers: [
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
