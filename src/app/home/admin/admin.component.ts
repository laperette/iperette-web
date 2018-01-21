import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private http: HttpClient) {}

  users = [];

  ngOnInit() {
    const url = environment.apiUrl + '/users';
    this.http.get(url).subscribe(
      (res: any) => {
        this.users = res;
        console.log(res);
      },
      err => {
        console.error(err);
      }
    );
  }
}
