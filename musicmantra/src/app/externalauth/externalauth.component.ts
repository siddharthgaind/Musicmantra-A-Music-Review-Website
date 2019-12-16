import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'


@Component({
  selector: 'app-externalauth',
  templateUrl: './externalauth.component.html',
  styleUrls: ['./externalauth.component.scss']
})
export class ExternalauthComponent implements OnInit {
  cookie1;
  cookie2;
  constructor(private CookieService:CookieService) { }

  ngOnInit() {
    this.cookie1=this.CookieService.get('token');
    this.cookie2=this.CookieService.get('userName');
    
    window.localStorage.setItem('token',this.cookie1)
    window.localStorage.setItem('userName',this.cookie2)
  }

}
