import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-spinner',
  template: `
  <button [ngClass]="['btn', btnClass]" [disabled]="disabled || loading">
  <app-spinner [show]="loading"></app-spinner>
  <ng-content></ng-content>
  </button>
`
})
export class ButtonSpinnerComponent implements OnInit {
  @Input() loading = false;
  @Input() disabled = false;
  @Input() btnClass: string;
  constructor() {}

  ngOnInit() {}
}
