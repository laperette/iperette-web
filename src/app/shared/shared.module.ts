import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { ButtonSpinnerComponent } from './button-spinner/button-spinner.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SpinnerComponent, ButtonSpinnerComponent],
  exports: [SpinnerComponent, ButtonSpinnerComponent]
})
export class SharedModule {}
