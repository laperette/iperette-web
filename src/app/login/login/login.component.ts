import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

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

  submit() {
    if (this.link.signin) {
      this.signin()
    } else {
      this.signup()
    }
  }
  signin() {
    console.log('signin')
  }
  signup() {
    console.log('signup')
  }

  ngOnInit() {
  }

}
