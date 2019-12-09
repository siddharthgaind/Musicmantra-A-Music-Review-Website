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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UnauthenticatedComponent,
    AuthenticatedComponent,
    ManageuserComponent,
    ManageplaylistComponent,
    ManagemusicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '',component: LoginComponent},
      {path:'admin',component: AdminComponent},
      {path:'manageUser',component: ManageuserComponent},
      {path:'open',component: UnauthenticatedComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
