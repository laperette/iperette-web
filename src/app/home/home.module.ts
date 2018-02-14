import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { CalendarModule } from 'angular-calendar';
import { HomeComponent } from './home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { BookingService } from './booking.service';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { RoleGuard } from './role.guard';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ClickedDayModalContentComponent } from './calendar/clicked-day-modal-content.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingActionsComponent } from './booking-actions/booking-actions.component';

import localeFr from '@angular/common/locales/fr';
import { SharedModule } from '../shared/shared.module';

registerLocaleData(localeFr);

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'profil', component: ProfileComponent },
      { path: 'calendar', component: CalendarComponent },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'ADMIN'
        }
      },
      { path: '', redirectTo: 'calendar', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    CalendarModule.forRoot(),
    RouterModule.forChild(homeRoutes),
    NgbModule
  ],
  entryComponents: [ClickedDayModalContentComponent],
  declarations: [
    ClickedDayModalContentComponent,
    ProfileComponent,
    HomeComponent,
    CalendarComponent,
    BookingFormComponent,
    AdminComponent,
    CapitalizePipe,
    BookingListComponent,
    BookingActionsComponent
  ],
  providers: [BookingService, RoleGuard]
})
export class HomeModule {}
