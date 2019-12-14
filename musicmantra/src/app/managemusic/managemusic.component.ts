import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-managemusic',
  templateUrl: './managemusic.component.html',
  styleUrls: ['./managemusic.component.scss']
})
export class ManagemusicComponent implements OnInit {

  constructor(private http: HttpClient) { }

  getMusicforUpdate;
  scan;
  getMusic: Array<any> = [];
  musicAttributes: any = {};
  output;


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
      this.getMusic = array[1].Music;
      console.log(this.getMusic);
    });
  }

  updateMusicAttributes(keyField: string, musicName, event: any) {
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
    this.http.put('http://localhost:5555/api/secure/changeMusicAttribute/' + musicName, JSON.stringify(post), config)
      .subscribe(data => {
        this.getMusicforUpdate = data;
        console.log(this.getMusicforUpdate);
      });
  }
  add() {
    console.log('add');
    this.scan = 1;
    console.log(this.scan);
  }

  addFieldValue() {
    console.log(this.musicAttributes);
    console.log(this.getMusic);
    this.getMusic.push(this.musicAttributes);
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'authToken': window.localStorage.getItem('token')
      }
    }
    this.http.post('http://localhost:5555/api/secure/addMusic', this.musicAttributes, config)
      .subscribe(data => {
        this.output = data;
        console.log(this.output);
      });
  }

  remove(index, musicName) {
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'authToken': window.localStorage.getItem('token')
      }
    }
    this.getMusic.splice(index, 1);
    this.http.delete('http://localhost:5555/api/admin/deleteMusic/' + musicName, config)
      .subscribe(data => {
        this.output = data;
        console.log(this.output);
      });
  }
}