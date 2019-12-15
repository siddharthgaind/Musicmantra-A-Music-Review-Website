import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  newUserCreated;

  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit() {
  }
  userLogin(loginform: NgForm) {
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
        localStorage.setItem('token', this.newUserCreated.newUser.token);
        if (this.newUserCreated.newUser.userType == "admin") {
          this.router.navigate(['/admin']);
        }
        else {
          this.router.navigate(['/authenticated']);
        }
      });
    window.alert("Login Successful.")
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
      });
    window.alert("Login Success.")
  }
}