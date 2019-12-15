import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
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
    NavbarComponent
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
    ])
  ],
  providers: [GetSet],
  bootstrap: [AppComponent]
})
export class AppModule { }
