import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Movie } from '../../models/movie.model';
import { CinemaService } from '../../services/cinema.service';

@Component({
  template: `
    <div>
      <div *ngIf="movie">
        <app-movie-details [movie]="movie"></app-movie-details>
        <app-movie-schedules [movie]="movie"></app-movie-schedules>
      </div>
      <div  *ngIf="!movie">
        <div class="center"><mat-progress-spinner mode="indeterminate"></mat-progress-spinner></div>
      </div>
    </div>
    <!--
    <div>
      <div *ngIf="movie$ | async as movie; else loading">
        <app-movie-details [movie]="movie"></app-movie-details>
        <app-movie-schedules [movie]="movie"></app-movie-schedules>
      </div>
      <ng-template #loading>
        <div class="center"><mat-progress-spinner mode="indeterminate"></mat-progress-spinner></div>
      </ng-template>
    </div>
    -->
  `,
  styleUrls: ['./movie.page.css'],
})
export class MoviePage implements OnInit, OnDestroy {

  movie?: Movie;
  // movie$?: Observable<Movie>;
  movieSubscription?: Subscription;

  constructor(
    private cinema: CinemaService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    // const id = this.route.snapshot.paramMap.get('id') ?? '1';

    // this.movie$ = this.route.paramMap.pipe(
    //   map((paramMap) => paramMap.get('id') ?? '1'),
    //   switchMap((id) => this.cinema.getMovie(id)),
    // );

    this.movieSubscription = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id') ?? '1'),
      switchMap((id) => this.cinema.getMovie(id)),
    ).subscribe((movie) => {
      this.movie = movie;
    });

  }

  ngOnDestroy(): void {

    this.movieSubscription?.unsubscribe();

  }

}
