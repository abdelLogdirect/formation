import { Component, OnInit, ChangeDetectionStrategy, Input, TrackByFunction } from '@angular/core';

import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movies-list',
  template: `
    <div class="app-movies-list">
      <app-movies-item *ngFor="let movie of movies; trackBy: trackBy" [movie]="movie"></app-movies-item>
    </div>
  `,
  styleUrls: ['./movies-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesListComponent implements OnInit {

  @Input() movies: Movie[] = [];

  get trackBy(): TrackByFunction<Movie> {
    return (_, movie) => movie.id;
  }

  constructor() {}

  ngOnInit(): void {}

}
