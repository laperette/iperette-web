import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from './models/User'
import { USERS } from './models/mockUsers'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iPerrette';
  users: User[] = [];
  constructor(private http: HttpClient) {
    this.getUsers()
  }

  getUsers() {
    this.users = USERS
    /*
    this.http.get('https://iperette.com/backend/users').subscribe(res => {
      this.users = res.json();
    })
    */
  }

}