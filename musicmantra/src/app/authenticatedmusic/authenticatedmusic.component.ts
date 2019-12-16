import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-authenticatedmusic',
  templateUrl: './authenticatedmusic.component.html',
  styleUrls: ['./authenticatedmusic.component.scss']
})
export class AuthenticatedmusicComponent implements OnInit {

  constructor(private http: HttpClient) { }

  musicToUpdate;
  scan;
  getAllMusic: Array<any> = [];
  musicAttributes: any = {};
  output;
  error;
  ngOnInit() {
    this.http.get('http://localhost:5555/api/secure/getAllMusic', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authToken: window.localStorage.getItem('token')
      })
    }).subscribe(data => {
      let array = [];
      Object.keys(data).map(function (key) {
        array.push({ [key]: data[key] })
      });
      this.getAllMusic = array[1].Music;
      console.log(this.getAllMusic);
    });
  }
  changeMusicAttributes(keyField: string, musicName, event: any) {
    const edit = event.target.textContent;
    let keyvalue = keyField;
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'authToken': window.localStorage.getItem('token')
      }
    }
    let post = {
      [keyField]: edit
    }
    this.http.put('http://localhost:5555/api/secure/changeSongAttribute/' + musicName, JSON.stringify(post), config)
      .subscribe(data => {
        this.musicToUpdate = data;
        console.log(this.musicToUpdate);
      });

  }
  add() {
    console.log('add');
    this.scan = 1;
    console.log(this.scan);
  }

  addFieldValue() {
    console.log(this.musicAttributes);
    console.log(this.getAllMusic);
    this.getAllMusic.push(this.musicAttributes);
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'authToken': window.localStorage.getItem('token')
      }
    }
    this.http.post('http://localhost:5555/api/secure/addMusic/', this.musicAttributes, config)
      .subscribe(data => {
        this.output = data;
        console.log(this.output);
      },
        err => {
        this.error = err.error; console.log(this.error);
        });
  }

  remove(index, musicName) {
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'authToken': window.localStorage.getItem('token')
      }
    }
    this.getAllMusic.splice(index, 1);
    this.http.delete('http://localhost:5555/api/admin/deleteMusic/' + musicName, config)
      .subscribe(data => {
        this.output = data;
        console.log(this.output);
      });
  }

}
