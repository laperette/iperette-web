import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginService } from './login.service';

const loginRoutes: Routes = [
  { path: '', component: LoginComponent }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(loginRoutes)
  ],
  providers: [LoginService],
  declarations: [LoginComponent]
})
export class LoginModule { }
