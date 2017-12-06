import { Component, OnInit } from '@angular/core';
import { User, UserSignin, UserSignup, UserSignedIn } from '../../models/User';
import { LoginService } from '../login.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginSvc: LoginService, private authSvc: AuthService) { }

  link = {
    signText: 'Pas encore inscrit ?',
    linkText: 'Déjà inscrit ?',
    title: 'Connexion',
    signin: true
  }
  changeLink(event) {
    event.preventDefault()
    this.link.signin = !this.link.signin
    if (this.link.signin) {
      this.link.signText = 'Pas encore inscrit ?'
      this.link.linkText = "S'inscrire"
      this.link.title = 'Connexion'
    } else {
      this.link.signText = 'Déjà inscrit ?'
      this.link.linkText = 'Se connecter'
      this.link.title = 'Inscription'
    }
  }
  submitted = false;
  model = new User();

  onSubmit() {
    this.submitted = true;
    if (this.link.signin) {
      let user: UserSignin = {
        email: 'alex.beh@mail.com',
        password: '123'
      };
      this.loginSvc.signin(user).subscribe((res: UserSignedIn) => {
        this.authSvc.login(res)
      }, err => {
        console.error(err.error)
      })
    } else {
      let user: UserSignup = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe2@mail.com',
        password: '123',
        phone: '0198345645'
      }
      this.loginSvc.signup(user).subscribe((res: UserSignedIn) => {
        this.authSvc.login(res)
      }, err => {
        console.error(err.error)
      })
    }
  }
  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
  }

}
