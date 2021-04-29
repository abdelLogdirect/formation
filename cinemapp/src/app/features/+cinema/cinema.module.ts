import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SlideshowModule } from '@core/slideshow';

import { CinemaRoutingModule } from './cinema-routing.module';
import { MoviesPage } from './pages/movies/movies.page';
import { MoviePage } from './pages/movie/movie.page';
import { TheatersPage } from './pages/theaters/theaters.page';
import { TheaterPage } from './pages/theater/theater.page';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MoviesItemComponent } from './components/movies-item/movies-item.component';
import { TheatersListComponent } from './components/theaters-list/theaters-list.component';
import { TheatersItemComponent } from './components/theaters-item/theaters-item.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { TheaterSchedulesComponent } from './components/theater-schedules/theater-schedules.component';
import { MovieSchedulesComponent } from './components/movie-schedules/movie-schedules.component';
import { MovieSlideComponent } from './components/movie-slide/movie-slide.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    SlideshowModule,
    CinemaRoutingModule,
  ],
  declarations: [
    MoviePage,
    MoviesPage,
    TheaterPage,
    TheatersPage,
    MovieDetailsComponent,
    MoviesListComponent,
    MoviesItemComponent,
    TheatersListComponent,
    TheatersItemComponent,
    SchedulesComponent,
    TheaterSchedulesComponent,
    MovieSchedulesComponent,
    MovieSlideComponent,
  ],
})
export class CinemaModule {}
