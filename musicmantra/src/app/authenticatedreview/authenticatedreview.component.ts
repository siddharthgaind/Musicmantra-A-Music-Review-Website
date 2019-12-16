import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-authenticatedreview',
  templateUrl: './authenticatedreview.component.html',
  styleUrls: ['./authenticatedreview.component.scss']
})
export class AuthenticatedreviewComponent implements OnInit {

  constructor(private http: HttpClient) { }
  getReviews;
  getAllMusic;
  valReview
  reviews: any = {};
  output;
  ngOnInit() {
    this.http.get('http://localhost:5555/api/secure/getReviewsForAllMusic', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authToken: window.localStorage.getItem('token')
      })
    }).subscribe(data => {

      let array = [];
      Object.keys(data).map(function (key) {
        array.push({ [key]: data[key] })
      });
      this.getReviews = array[1].Music;
      console.log(this.getReviews);
    });

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

  addReview(musicName, event: any) {
    const edit = event.target.textContent;
    console.log(this.valReview);
    console.log(edit);
    console.log(this.getAllMusic);
    console.log(this.reviews);
    this.reviews = {
      review: this.valReview,
      rating: edit,
      userName: window.localStorage.getItem("userName")
    }
    this.getReviews.push(this.reviews);
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'authToken': window.localStorage.getItem('token')
      }
    }
    this.http.post('http://localhost:5555/api/secure/addReview/' + musicName, this.reviews, config)
      .subscribe(data => {
        this.output = data;
        console.log(this.output);
      });
      location.reload();
  }

  setReview(event: any) {
    this.valReview = event.target.textContent;
  }
}