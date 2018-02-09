import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../login.css']
})
export class SignInComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {}
  signForm: FormGroup;
  isLoading: boolean;
  displayAlert: boolean;
  ngOnInit() {
    this.signForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
    this.isLoading = false;
    this.displayAlert = false;
  }

  onSubmit() {
    this.isLoading = true;
    this.authSvc.signin(this.signForm.value).subscribe(
      done => {
        this.displayAlert = false;
        this.router.navigateByUrl('/home').then(
          next => {
            this.isLoading = false;
          },
          err => {
            this.isLoading = false;
          }
        );
      },
      err => {
        this.displayAlert = true;
        this.isLoading = false;
      }
    );
  }
}
