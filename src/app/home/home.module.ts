import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { CalendarModule } from 'angular-calendar';
import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profil', component: ProfileComponent }
]

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot(),
    RouterModule.forChild(homeRoutes)
  ],
  declarations: [ProfileComponent, HomeComponent]
})
export class HomeModule { }
