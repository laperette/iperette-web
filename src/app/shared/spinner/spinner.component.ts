import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
  <i class="fa fa-spinner fa-pulse" *ngIf="show"></i>
`,
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() show = false;
  constructor() {}

  ngOnInit() {}
}
