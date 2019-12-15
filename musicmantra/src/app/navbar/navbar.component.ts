import { Component, OnInit } from '@angular/core';
import { GetSet } from 'src/GetSet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  val: string;

  constructor(private router: Router, private service: GetSet) {
    this.service = service;
  }
  ngOnInit() {
  }
  send(str) {
    console.log("string to save is:" + str);
    this.service.saveData(str);
    this.router.navigate(['/searchMusic']);
  }
}



