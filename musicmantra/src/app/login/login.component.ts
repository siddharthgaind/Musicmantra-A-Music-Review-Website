import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  newUserCreated;
  error;
  button = 0;

  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit() {
  }
  userLogin(loginform: NgForm) {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    const login = loginform.value;
    console.log(loginform.value);
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    this.http.post('http://localhost:5555/api/logIn', JSON.stringify(login), config)
      .subscribe(response => {
        this.newUserCreated = response
        console.log(this.newUserCreated);
        console.log(this.newUserCreated.newUser.token);
        console.log(this.newUserCreated.newUser.userName);
        localStorage.setItem('token', this.newUserCreated.newUser.token);
        localStorage.setItem('userName', this.newUserCreated.newUser.userName);
        console.log(this.newUserCreated.newUser.userIsVerified)
        if (this.newUserCreated.newUser.userStatus== "Deactivated") {
          window.alert("Your account is currently deactivated. Please contact the site manager.");
        }
        else if (this.newUserCreated.newUser.userIsVerified == false) {
          window.alert("You are not verified");
          this.button = 1;
        }
        else if (this.newUserCreated.newUser.userType == "Admin") {
          window.alert("You are authenticated as an admin.")
          this.router.navigate(['/admin']);
        }
        else {
          window.alert("Successfully Authenticated")
          this.router.navigate(['/authenticated']);
        }
      }, err => {

        this.error = err.error;
        console.log(this.error);

      });
  }

  newUserLogin(loginform: NgForm) {
    const login = loginform.value;
    console.log(loginform.value);
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    this.http.post('http://localhost:5555/api/signIn', JSON.stringify(login), config)
      .subscribe(response => {
        this.newUserCreated = response
        console.log(this.newUserCreated.UserDetails.token);
        localStorage.setItem('token', this.newUserCreated.UserDetails.token);
        this.router.navigate(['/popularMusic']);
      },
        err => {

          this.error = err.error;
          console.log(this.error);

        });
  }

  newEmailVerify(email,password){
    console.log(email);
    console.log(password);
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    let path= 'http://localhost:5555/api/verifyFalse?email='+email;
  this.http.get(path, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      authToken: window.localStorage.getItem('token')
    })
  })
    .subscribe(response => {
        this.newUserCreated = response
        window.alert("You are successfully authenticated");
      }, err => {this.error = err.error;console.log(this.error);});
  }

  externalAuth() {
    localStorage.removeItem('token');
  }

}


