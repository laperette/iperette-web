import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../login.css']
})
export class SignUpComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {}
  signForm: FormGroup;
  isLoading: boolean;
  displayAlert: boolean;
  get email() {
    return this.signForm.get('email');
  }
  ngOnInit() {
    this.signForm = this.fb.group(
      {
        email: ['', Validators.email],
        password: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        password2: ['', Validators.required],
        phone: [
          '',
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(10),
            Validators.pattern(/^0\d+$/)
          ]
        ]
      },
      { validator: this.passwordValidator }
    );
    this.isLoading = false;
    this.displayAlert = false;
  }
  onSubmit() {
    this.isLoading = true;
    this.authSvc.signup(this.signForm.value).subscribe(
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
  get errors() {
    return this.signForm.hasError('nomatch');
  }
  private passwordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } {
    return control.get('password').value === control.get('password2').value
      ? null
      : { nomatch: true };
  }
}
