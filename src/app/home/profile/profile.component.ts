import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient) { }

  users = []

  ngOnInit() {
    this.http.get('http://localhost:3000/users/').subscribe((res: any) => {
      this.users = res;
      console.log(res)
    }, err => {
      console.error(err)
    })
  }

}