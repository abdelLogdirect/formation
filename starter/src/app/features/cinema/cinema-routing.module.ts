import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviePage } from './pages/movie/movie.page';
import { MoviesPage } from './pages/movies/movies.page';


const routes: Routes = [
  { path: 'movie/:id', component: MoviePage },
  { path: 'movies', component: MoviesPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CinemaRoutingModule { }
