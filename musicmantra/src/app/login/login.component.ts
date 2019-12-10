import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userCreated;

  constructor(private http: HttpClient,public router:Router) { }

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
  
    this.http.post('http://localhost:5555/api/login', JSON.stringify(login), config)
      .subscribe(response => {
        this.userCreated = response
        console.log(this.userCreated.UserDetails.token);
        localStorage.setItem('token', this.userCreated.UserDetails.token);
        if(this.userCreated.UserDetails.userStatus="Admin"){
        this.router.navigate(['/admin']); }
        else{
          this.router.navigate(['/topSongs']);
        }
      });
      window.alert("dhang se daal")
    }
}
