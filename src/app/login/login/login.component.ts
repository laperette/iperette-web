import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserSignin, UserSignup, UserSignedIn } from '../../models/User';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {
    this.user = new User();
  }
  user: User;
  link = {
    signText: 'Pas encore inscrit ?',
    linkText: "S'inscrire",
    title: 'Connexion',
    signin: true,
    signForm: this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    })
  };

  changeLink(event) {
    event.preventDefault();
    this.link.signin = !this.link.signin;
    if (this.link.signin) {
      this.link.signText = 'Pas encore inscrit ?';
      this.link.linkText = "S'inscrire";
      this.link.title = 'Connexion';
      this.link.signForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    } else {
      this.link.signText = 'Déjà inscrit ?';
      this.link.linkText = 'Se connecter';
      this.link.title = 'Inscription';
      this.link.signForm = this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        phone: ['', [Validators.minLength(10), Validators.maxLength(10)]],
        email: ['', Validators.email],
        password: ['', Validators.required]
      });
    }
  }
  submitted = false;
  model = new User();

  onSubmit() {
    this.submitted = true;
    const formModel = this.link.signForm.value;
    console.log(formModel);
    if (this.link.signin) {
      const user: UserSignin = {
        email: formModel.email as string,
        password: formModel.password as string
      };
      this.authSvc.signin(user).subscribe(
        done => {
          if (done) {
            this.router.navigateByUrl('/home');
          } else {
            // display error msg
          }
        },
        err => {
          // display error msg
          console.error(err.error);
        }
      );
    } else {
      const user: UserSignup = {
        firstname: formModel.firstname as string,
        lastname: formModel.lastname as string,
        email: formModel.email as string,
        password: formModel.password as string,
        phone: formModel.phone as string
      };
      this.authSvc.signup(user).subscribe(
        done => {
          if (done) {
            this.router.navigateByUrl('/home');
          } else {
            // display error msg
          }
        },
        err => {
          // display error msg
          console.error(err.error);
        }
      );
    }
  }
  get diagnostic() {
    return JSON.stringify(this.model);
  }

  ngOnInit() {}
}
