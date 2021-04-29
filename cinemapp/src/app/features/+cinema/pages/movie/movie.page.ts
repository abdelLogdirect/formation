import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
  `,
  styleUrls: ['./movie.page.css'],
})
export class MoviePage implements OnInit {

  movie?: Movie;

  constructor(
    private cinema: CinemaService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id') ?? '1';

    this.cinema.getMovie(id).subscribe((movie) => {
      this.movie = movie;
    });

  }

}
