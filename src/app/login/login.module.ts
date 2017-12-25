import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginService } from './login.service';
import { AlertModule } from '../alerts/alert.module';

const loginRoutes: Routes = [
  { path: '', component: LoginComponent }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes),
    AlertModule
  ],
  providers: [LoginService],
  declarations: [LoginComponent]
})
export class LoginModule { }
