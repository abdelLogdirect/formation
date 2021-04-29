import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-schedules',
  template: `
  <div class="app-schedules">
    <div *ngFor="let schedulesGroup of movie?.schedulesGroups">
      <app-schedules [schedules]="schedulesGroup">
        <p>{{ schedulesGroup[0]!.theater.title }}</p>
      </app-schedules>
    </div>
  </div>
  `,
  styleUrls: ['../schedules/schedules.component.css', './movie-schedules.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieSchedulesComponent implements OnInit {

  @Input() movie?: Pick<Movie, 'schedulesGroups'>;

  constructor() {}

  ngOnInit(): void {}

}
