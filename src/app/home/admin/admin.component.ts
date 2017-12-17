import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

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
