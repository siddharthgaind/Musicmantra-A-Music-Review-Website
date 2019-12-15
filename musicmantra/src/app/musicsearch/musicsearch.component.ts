import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GetSet } from 'src/GetSet';
@Component({
  selector: 'app-musicsearch',
  templateUrl: './musicsearch.component.html',
  styleUrls: ['./musicsearch.component.scss']
})
export class MusicsearchComponent implements OnInit {
  search: Object;
  name;
  constructor(private service: GetSet, public router: Router, private http: HttpClient) {
    this.service = service;
  }
  ngOnInit() {
    this.name = this.service.getData();
    console.log("Search parameter is " + this.name)
    this.http.get('http://localhost:5555/api/open/searchMusic/' + this.name).subscribe(data => {
      this.search = data
      console.log(this.search);
    });
  }

  callback() {
    console.log('Go-back');
    this.router.navigate(['/']);
  }
}