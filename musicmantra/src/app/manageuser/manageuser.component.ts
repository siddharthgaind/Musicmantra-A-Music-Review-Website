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
  response;
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
      this.response = data;
      console.log(this.response);
    });
  }
  
  changeUserType( userName, event: any) {
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
        this.response = data;
        console.log(this.response);
      });
  }

  changeUserStatus( userName, event: any) {
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
        this.response = data;
        console.log(this.response);
      });
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