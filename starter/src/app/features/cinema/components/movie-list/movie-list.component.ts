import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Movie } from '../../services/movie.model';

@Component({
  selector: 'app-movie-list',
  template: `
    <div *ngFor="let movie of movies">
      <h2><a [routerLink]="['../movie', movie.id]">{{ movie.title }}</a></h2>
      <img [src]="movie.imgSrc">
    </div>
  `,
  styleUrls: ['./movie-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit {

  @Input() movies: Movie[] = [];

  constructor() {}

  ngOnInit(): void {
  }

}
