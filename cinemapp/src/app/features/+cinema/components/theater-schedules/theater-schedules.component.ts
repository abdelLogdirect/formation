import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Theater } from '../../models/theater.model';

@Component({
  selector: 'app-theater-schedules',
  template: `
    <div class="app-schedules">
      <div *ngFor="let schedulesGroup of theater?.schedulesGroups">
        <app-schedules [schedules]="schedulesGroup">
          <img [src]="schedulesGroup[0]!.movie.imgSrc" [alt]="schedulesGroup[0]!.movie.title" mat-card-image>
          <p>{{ schedulesGroup[0]!.movie.title }}</p>
        </app-schedules>
      </div>
    </div>
  `,
  styleUrls: ['../schedules/schedules.component.css', './theater-schedules.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TheaterSchedulesComponent implements OnInit {

  @Input() theater?: Pick<Theater, 'schedulesGroups'>;

  constructor() {}

  ngOnInit(): void {}

}
