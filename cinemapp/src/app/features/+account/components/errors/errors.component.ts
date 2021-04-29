import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-errors',
  template: `
    <ul *ngIf="errors.length">
      <li *ngFor="let error of errors">{{ error }}</li>
    </ul>
  `,
  styleUrls: ['./errors.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorsComponent implements OnInit {

  @Input() errors: string[] = [];

  constructor() {}

  ngOnInit(): void {}

}
