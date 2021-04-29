import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Slide } from '../../models/slide.model';
import { Movie } from '../../models/movie.model';
import { CinemaService } from '../../services/cinema.service';

@Component({
  template: `
    <div>
      <div>
        <mat-toolbar><span i18n="@@moviesStarred">Films à la une</span></mat-toolbar>
        <app-slideshow [delay]="3000" *ngIf="slides$ | async as slides; else slidesLoading">
          <app-slide *ngFor="let slide of slides">
            <app-movie-slide [slide]="slide" [routerLink]="['../movie', slide.movieId]"></app-movie-slide>
          </app-slide>
        </app-slideshow>
        <ng-template #slidesLoading>
          <div class="center"><mat-progress-spinner mode="indeterminate"></mat-progress-spinner></div>
        </ng-template>
      </div>
      <div>
        <mat-toolbar><span i18n="@@moviesAll">Tous les films</span></mat-toolbar>
        <app-movies-list *ngIf="movies$ | async as movies; else moviesLoading" [movies]="movies"></app-movies-list>
        <ng-template #moviesLoading>
          <div class="center"><mat-progress-spinner mode="indeterminate"></mat-progress-spinner></div>
        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./movies.page.css'],
})
export class MoviesPage implements OnInit {

  movies$?: Observable<Movie[]>;
  slides$?: Observable<Slide[]>;

  constructor(
    private cinema: CinemaService,
  ) { }

  ngOnInit(): void {

    this.movies$ = this.cinema.getMovies();

    this.slides$ = this.cinema.getSlides();

  }

}
