import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-manageplaylist',
  templateUrl: './manageplaylist.component.html',
  styleUrls: ['./manageplaylist.component.scss']
})
export class ManageplaylistComponent implements OnInit {

  constructor(private http: HttpClient) { }

  getAllPlaylist;
  getAllMusic;
  addMusic;
  currentMusic;
  output;
  scan;
  musicNameToAdd = [];
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
      this.getAllPlaylist = array[1].Playlist;
      console.log(this.getAllPlaylist);
      console.log(this.getAllPlaylist[0].addMusic);
    });

    this.http.get('http://localhost:5555/api/secure/getAllMusic', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authToken: window.localStorage.getItem('token')
      })
    }).subscribe(data => {
      this.getAllMusic = data;
      console.log(this.getAllMusic);
    });
  }

  addMusicToNewPlaylist(addMusic) {
    console.log('clicked');
    console.log(addMusic);
    this.playlistAttributes.music.push(addMusic);
    console.log(this.playlistAttributes);
  }

  addToPlaylist(index,name,musicName){
    console.log(name);
    console.log(index);
    console.log(musicName);
    
    this.getAllPlaylist[index].addMusic.push(musicName);
    let post = {
      addMusic: musicName
    }
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'authToken': window.localStorage.getItem('token')
      }}
    this.http.put('http://localhost:5555/api/secure/addToPlaylist/'+name,JSON.stringify(post), config)
    .subscribe(data => {
      this.output = data;
      console.log(this.output);
    });

  }

  add() {
    console.log('add');
    this.scan = 1;
    console.log(this.scan);
  }

  addFieldValue() {
    console.log(this.playlistAttributes);
    console.log(this.getAllPlaylist);
    this.getAllPlaylist.push(this.playlistAttributes);
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
      });
  }

  remove(index, name) {
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'authToken': window.localStorage.getItem('token')
      }
    }
    this.getAllPlaylist.splice(index, 1);
    this.http.delete('http://localhost:5555/api/secure/removePlaylist/' + name, config)
      .subscribe(data => {
        this.output = data;
        console.log(this.output);
      });
  }

  updatePlaylistAttributes(keyField: string, name, event: any) {
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

  removeFromPlaylist(id,id1,musicInPlaylist, name) {
    console.log('musicInPlaylist' + musicInPlaylist);
    this.getAllPlaylist[id].addMusic.splice(id1, 1);

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
}