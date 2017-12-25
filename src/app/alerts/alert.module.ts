import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [AlertComponent],
  providers: [AlertService],
  exports: [AlertComponent]
})
export class AlertModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: AlertModule, providers: [AlertService] };
  }
}
