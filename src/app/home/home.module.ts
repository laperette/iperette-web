import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { CalendarModule } from 'angular-calendar';
import { HomeComponent } from './home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { BookingService } from './booking.service'
import { BookingFormComponent } from './booking-form/booking-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
    CalendarModule.forRoot(),
    RouterModule.forChild(homeRoutes),
    NgbModule
  ],
  declarations: [ProfileComponent, HomeComponent, CalendarComponent, BookingFormComponent],
  providers: [BookingService]
})
export class HomeModule { }
