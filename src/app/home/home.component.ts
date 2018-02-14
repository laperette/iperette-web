import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../models/User';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService) {}

  date = new Date().getFullYear();
  admin = false;
  user: Observable<User>;
  ngOnInit() {
    this.admin = this.authService.userRole === 'ADMIN';
    this.user = this.authService.user;
    this.authService.logUser();
  }

  logout() {
    this.authService.logout();
  }
}
