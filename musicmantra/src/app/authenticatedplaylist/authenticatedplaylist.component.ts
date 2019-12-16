import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetSet } from 'src/GetSet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticatedplaylist',
  templateUrl: './authenticatedplaylist.component.html',
  styleUrls: ['./authenticatedplaylist.component.scss']
})
export class AuthenticatedplaylistComponent implements OnInit {

  constructor(private http: HttpClient, private service: GetSet, private router: Router) { }
  getPlaylist;
  getAllMusic;
  addMusic;
  currentMusic;
  output;
  scan;
  error;
  playlistAttributes: any = {
    music: []
  }

  ngOnInit() {

    this.http.get('http://localhost:5555/api/secure/playlists', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authToken: window.localStorage.getItem('token')
      })
    }).subscribe(data => {
      let array = [];
      Object.keys(data).map(function (key) {
        array.push({ [key]: data[key] })
      });
      this.getPlaylist = array[1].Playlist;
      console.log(this.getPlaylist);
      console.log(this.getPlaylist[0].addMusic);
    });

    this.http.get('http://localhost:5555/api/secure/getAllMusic', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authToken: window.localStorage.getItem('token')
      })
    }).subscribe(data => {
      this.getAllMusic = data;
      let array = [];
      Object.keys(data).map(function (key) {
        array.push({ [key]: data[key] })
      });
      this.getAllMusic = array[1].Music;
      console.log(this.getAllMusic);
    });
  }

  addToPlaylist(index, name, musicName) {
    console.log(name);
    console.log(index);
    console.log(musicName);
    this.getPlaylist[index].addMusic.push(musicName);

    let post = {
      addMusic: musicName
    }
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'authToken': window.localStorage.getItem('token')
      }
    }
    this.http.put('http://localhost:5555/api/secure/addToPlaylist/' + name, JSON.stringify(post), config)
      .subscribe(data => {
        this.output = data;
        console.log(this.output);
      });
  }

  addMusicToNewPlaylist(addMusic) {
    console.log('clicked');
    console.log(addMusic);
    this.playlistAttributes.music.push(addMusic);
    console.log(this.playlistAttributes);

  }

  add() {
    console.log('add');
    this.scan = 1;
    console.log(this.scan);
  }

  addFieldValue() {
    console.log(this.playlistAttributes);
    console.log(this.getPlaylist);
    this.getPlaylist.push(this.playlistAttributes);
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'authToken': window.localStorage.getItem('token')
      }
    }
    this.http.post('http://localhost:5555/api/secure/playlist/', this.playlistAttributes, config)
      .subscribe(data => {
        this.output = data;
        console.log(this.output);
      }, err => {this.error = err.error;console.log(this.error);});
  }


  remove(index, musicName) {
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'authToken': window.localStorage.getItem('token')
      }
    }
    console.log(index)
    this.getPlaylist.splice(index, 1);
    this.http.delete('http://localhost:5555/api/secure/removePlaylist/' + name, config)
      .subscribe(data => {
        this.output = data;
        console.log(this.output);
      });
  }

  updatePlaylistAttributes(keyField: string, playlistName, event: any) {
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
    this.http.put('http://localhost:5555/api/secure/playlist/' + name, JSON.stringify(post), config)
      .subscribe(data => {
        this.output = data;
        console.log(this.output);
      });
  }

  removeFromPlaylist(id, id1, musicInPlaylist, name) {
    console.log('musicInPlaylist' + musicInPlaylist);
    console.log(id)
    this.getPlaylist[id].addMusic.splice(id1, 1);

    var config = {
      headers: {
        'Content-Type': 'application/json',
        'authToken': window.localStorage.getItem('token')
      }
    }
    let post = {
      addMusic: musicInPlaylist
    }

    this.http.put('http://localhost:5555/api/secure/removeFromPlaylist/' + name, JSON.stringify(post), config)
      .subscribe(data => {
        this.output = data;
        console.log(this.output);
      });
  }
  send(str) {
    console.log("string to save is:" + str);
    this.service.saveData(str);
    this.router.navigate(['/searchPlaylist']);
  }
}