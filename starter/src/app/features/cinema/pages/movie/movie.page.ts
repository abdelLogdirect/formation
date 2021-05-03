import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CinemaService } from '../../services/cinema.service';
import { Movie } from '../../services/movie.model';

@Component({
  template: `
    <app-movie-details [movie]="movie"></app-movie-details>
  `,
  styleUrls: ['./movie.page.css']
})
export class MoviePage implements OnInit {

  movie?: Movie;

  constructor(
    private cinemaService: CinemaService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id') ?? '1';

    this.cinemaService.getMovie(id).subscribe((data) => {

      this.movie = data;

    });

    // this.cinemaService.getMovieV2(id).subscribe(({ data }) => {

    //   this.movie = data;

    // });

  }

}
