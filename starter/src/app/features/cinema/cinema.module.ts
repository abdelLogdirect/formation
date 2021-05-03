import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CinemaRoutingModule } from './cinema-routing.module';
import { MoviesPage } from './pages/movies/movies.page';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviePage } from './pages/movie/movie.page';


@NgModule({
  declarations: [
    MoviesPage,
    MovieListComponent,
    MovieDetailsComponent,
    MoviePage
  ],
  imports: [
    CommonModule,
    CinemaRoutingModule
  ]
})
export class CinemaModule { }
