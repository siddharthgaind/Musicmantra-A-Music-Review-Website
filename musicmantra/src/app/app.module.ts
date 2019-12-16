import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {CookieService} from 'ngx-cookie-service'
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UnauthenticatedComponent } from './unauthenticated/unauthenticated.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { ManageplaylistComponent } from './manageplaylist/manageplaylist.component';
import { ManagemusicComponent } from './managemusic/managemusic.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PopularmusicComponent } from './popularmusic/popularmusic.component';
import { AuthenticatedmusicComponent } from './authenticatedmusic/authenticatedmusic.component';
import { AuthenticatedplaylistComponent } from './authenticatedplaylist/authenticatedplaylist.component';
import { AuthenticatedreviewComponent } from './authenticatedreview/authenticatedreview.component';
import { MusicsearchComponent } from './musicsearch/musicsearch.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GetSet } from 'src/GetSet';
import { PlaylistsearchComponent } from './playlistsearch/playlistsearch.component';
import { ModalComponent } from './modal/modal.component';
import { ExternalauthComponent } from './externalauth/externalauth.component';
import { JoinComponent } from './join/join.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UnauthenticatedComponent,
    AuthenticatedComponent,
    ManageuserComponent,
    ManageplaylistComponent,
    ManagemusicComponent,
    PopularmusicComponent,
    AuthenticatedmusicComponent,
    AuthenticatedplaylistComponent,
    AuthenticatedreviewComponent,
    MusicsearchComponent,
    NavbarComponent,
    PlaylistsearchComponent,
    ModalComponent,
    ExternalauthComponent,
    JoinComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '',component: LoginComponent},
      {path:'admin',component: AdminComponent},
      {path:'manageUser',component: ManageuserComponent},
      {path:'managePlaylist',component: ManageplaylistComponent},
      {path:'manageMusic',component: ManagemusicComponent},
      {path:'open',component: UnauthenticatedComponent},
      {path:'popularmusic' ,component: PopularmusicComponent},
      {path:'authenticated' ,component: AuthenticatedComponent},
      {path:'addMusic',component:  AuthenticatedmusicComponent},
      {path:'addPlaylist',component:  AuthenticatedplaylistComponent},
      {path:'addReview',component:  AuthenticatedreviewComponent},
      {path:'searchMusic',component:  MusicsearchComponent},
      {path:'searchPlaylist',component:  PlaylistsearchComponent},
      {path:'externalauth',component:  ExternalauthComponent},
      {path:'join',component:  JoinComponent},

    ])
  ],
  providers: [GetSet,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
