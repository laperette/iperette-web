import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
  <div class="loader" *ngIf="show"></div>
`,
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() show = false;
  constructor() {}

  ngOnInit() {}
}
