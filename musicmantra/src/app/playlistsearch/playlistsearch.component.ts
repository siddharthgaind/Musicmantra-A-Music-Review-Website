import { Component, OnInit } from '@angular/core';
import { GetSet } from 'src/GetSet';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-playlistsearch',
  templateUrl: './playlistsearch.component.html',
  styleUrls: ['./playlistsearch.component.scss']
})
export class PlaylistsearchComponent implements OnInit {
  search:Object;
  name;
  userName;
  userPlaylist;
  addMusicPlaylist;
  addMusic;
  constructor(private service:GetSet,public router:Router,private http :HttpClient,private ModalService:ModalService) {
  this.service=service;
}
  ngOnInit() {
    this.name=this.service.getData();
    console.log("search string is "+this.name)
     this.http.get('http://localhost:5555/api/open/searchMusic/'+(this.name)).subscribe(data => {
      this.search = data
      console.log(this.search);
    });

    this.userName=localStorage.getItem('userName');
    console.log(this.userName);
    this.http.get('http://localhost:5555/api/secure/userPlaylist/'+this.userName).subscribe(data => {
      this.userPlaylist = data
      let array = [];
      Object.keys(data).map(function (key) {
        array.push({ [key]: data[key] })
    });
    this.userPlaylist = array[1].Playlist;
  });
  }

  openModal(id: string, addMusic) {
   this.ModalService.open(id);
   this.addMusic=addMusic;
   console.log(this.addMusic);

  }

  addMusicToPlaylist(name){
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'authToken': window.localStorage.getItem('token')
      }
    }
    console.log(this.addMusic)
    let post = {
      addMusic: this.addMusic
    }
    this.http.put('http://localhost:5555/api/secure/addToPlaylist/' + name, JSON.stringify(post), config)
      .subscribe(data => {
        this.addMusicPlaylist = data;
        console.log(this.addMusicPlaylist);
      });  
  }
}