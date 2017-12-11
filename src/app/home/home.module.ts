import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { CalendarModule } from 'angular-calendar';
import { HomeComponent } from './home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { BookingService } from './booking.service'
import { HttpClientModule } from '@angular/common/http';
import { BookingFormComponent } from './booking-form/booking-form.component';

const homeRoutes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: 'profil', component: ProfileComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: '', redirectTo: 'calendar', pathMatch: 'full' }
    ]
  },

]

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot(),
    RouterModule.forChild(homeRoutes),
    HttpClientModule
  ],
  declarations: [ProfileComponent, HomeComponent, CalendarComponent, BookingFormComponent],
  providers: [BookingService]
})
export class HomeModule { }
