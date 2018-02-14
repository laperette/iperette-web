import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggerService } from '../../logger.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../login.css']
})
export class SignInComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    loggerService: LoggerService
  ) {
    this.logger = loggerService.create('SignInComponent');
  }
  private logger: NGXLogger;
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
        this.logger.error('error sign in', err);
        this.displayAlert = true;
        this.isLoading = false;
      }
    );
  }
}
