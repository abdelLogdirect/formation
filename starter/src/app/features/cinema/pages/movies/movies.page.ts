import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../../services/cinema.service';
import { Movie } from '../../services/movie.model';

@Component({
  template: `
    <app-movie-list [movies]="movies"></app-movie-list>
  `,
  styleUrls: ['./movies.page.css']
})
export class MoviesPage implements OnInit {

  movies: Movie[] = [];

  constructor(
    private cinemaService: CinemaService,
  ) {}

  ngOnInit(): void {

    this.cinemaService.getMovies().subscribe((data) => {

      this.movies = data;

    });

    // this.cinemaService.getMoviesV2().subscribe(({ data }) => {

    //   this.movies = data;

    // });

    // fetch('http://localhost:3000/api/v1/cinema/movies')
    //   .then((response) => response.json())
    //   .then((json) => {
    //     this.movies = json;
    //   });

  }

}
