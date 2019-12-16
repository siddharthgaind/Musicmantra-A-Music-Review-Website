import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.scss']
})
export class ManageuserComponent implements OnInit {

  constructor(private http: HttpClient) { }

  users;
  output;
  error;
  edit: string;

  ngOnInit() {
    this.http.get('http://localhost:5555/api/admin/getAllUsers', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authToken: window.localStorage.getItem('token')
      })
    }).subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
  }

  removeUser(userName) {
    this.http.get('/admin/changeUserType/' + (userName), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authToken: window.localStorage.getItem('token')
      })
    }).subscribe(data => {
      this.output = data;
      console.log(this.output);
    }, err => {
      this.error = err.error;
      console.log(this.error);

    });
  }

  changeUserType(userName, event: any) {
    const edit = event.target.textContent;
    console.log(edit);
    console.log(userName);
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'authToken': window.localStorage.getItem('token')
      }
    }
    let post = {
      userType: edit
    }

    this.http.put('http://localhost:5555/api/admin/changeUserType/' + userName, JSON.stringify(post), config)
      .subscribe(data => {
        this.output = data;
        console.log(this.output);
      }, err => { this.error = err.error; console.log(this.error); });
  }

  changeUserStatus(userName, event: any) {
    const edit = event.target.textContent;
    console.log(edit);
    console.log(userName);
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'authToken': window.localStorage.getItem('token')
      }
    }
    let post = {
      userStatus: edit
    }

    this.http.put('http://localhost:5555/api/admin/changeUserStatus/' + userName, JSON.stringify(post), config)
      .subscribe(data => {
        this.output = data;
        console.log(this.output);
      }, err => { this.error = err.error; console.log(this.error); });
    }

  remove(id: any) {
  }

  add() {
  }

  changeValue(event: any) {
    console.log('changeValue');
    this.edit = event.target.textContent;
  }
}