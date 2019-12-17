import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-joim',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  constructor(private http: HttpClient, public router: Router) { }
  newUserCreated;
  error;

  ngOnInit() {

  }

  newUserLogin(loginform: NgForm) {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');

    const login = loginform.value;
    console.log(loginform.value);
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    this.http.post('http://localhost:5555/api/newEmail', JSON.stringify(login), config)
      .subscribe(response => {
        this.newUserCreated = response
        window.alert("You are successfully registered. Please verify using email.");
        //this.router.navigate(['/popularmusic']);
      }, err => {this.error = err.error;console.log(this.error);});
  }

}