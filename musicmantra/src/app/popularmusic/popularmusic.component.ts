import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-popularmusic',
  templateUrl: './popularmusic.component.html',
  styleUrls: ['./popularmusic.component.scss']
})
export class PopularmusicComponent implements OnInit {

  musicList: Object;
  musicAttributes: Object;
  element: Object;
  showReview = 0;
  review = 0;
  musicReviews: Object;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:5555/api/open/getPopularMusic', {
      // headers: new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   authToken: window.localStorage.getItem('token')
      // })
    }).subscribe(data => {
      this.musicList = data;
      console.log(this.musicList);
    });
  }

  getMusicFromName(musicName) {
    return this.http.get('http://localhost:5555/api/open/getMusicFromName' + (musicName)).subscribe(data => {
      this.musicAttributes = data
      console.log(this.musicAttributes);
    });
  }

  action(index) {
    this.element = index;
    this.review = 0;
  }

  showReviews(index, musicName) {
    this.showReview = index;
    console.log(musicName.replace("%20", " "));
    this.review = 1;
    this.http.get('http://localhost:5555/api/open/getReviewsForMusic/' + (musicName.replace("%20", " ")))
      .subscribe(data => {
        this.musicReviews = data
        console.log(this.musicReviews);
      });
  }
}