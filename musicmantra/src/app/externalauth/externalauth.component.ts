import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'


@Component({
  selector: 'app-externalauth',
  templateUrl: './externalauth.component.html',
  styleUrls: ['./externalauth.component.scss']
})
export class ExternalauthComponent implements OnInit {
  cookie;
  constructor(private CookieService:CookieService) { }

  ngOnInit() {
    this.cookie=this.CookieService.get('token');
    window.localStorage.setItem('token',this.cookie)
  }

}
