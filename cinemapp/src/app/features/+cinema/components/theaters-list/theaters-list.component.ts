import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Theater } from '../../models/theater.model';

@Component({
  selector: 'app-theaters-list',
  template: `
    <div>
      <app-theaters-item *ngFor="let theater of theaters" [theater]="theater"></app-theaters-item>
    </div>
  `,
  styleUrls: ['./theaters-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TheatersListComponent implements OnInit {

  @Input() theaters: Theater[] = [];

  constructor() {}

  ngOnInit(): void {}

}
