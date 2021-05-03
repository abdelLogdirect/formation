import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Movie } from '../../services/movie.model';

@Component({
  selector: 'app-movie-details',
  template: `
    <div *ngIf="movie">
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.summary }}</p>
    </div>
  `,
  styleUrls: ['./movie-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie?: Movie;

  constructor() { }

  ngOnInit(): void {
  }

}
