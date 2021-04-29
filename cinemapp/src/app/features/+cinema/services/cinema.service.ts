import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchOffline } from '@ngx-pwa/offline';

import { environment } from '@core/environment';
import { APIData, prependEnvironmentItem, prependEnvironmentList } from '@core/api';

import { Movie } from '../models/movie.model';
import { Theater } from '../models/theater.model';
import { Slide } from '../models/slide.model';
import { groupSchedulesByTheater, groupSchedulesByMovie } from './group-schedules';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  constructor(
    private http: HttpClient,
  ) {}

  /**
   * Get a list of movies from the API
   */
  getMovies(): Observable<Movie[]> {

    return this.http.get<APIData<Movie[]>>(`${environment.apiUrl}/api/v2/cinema/movies`).pipe(
      map((response) => response.data),
      prependEnvironmentList('imgSrc'),
      catchOffline(),
    );

  }

  /**
   * Get a movie from the API
   */
  getMovie(id: string | number): Observable<Movie> {

    return this.http.get<APIData<Movie>>(`${environment.apiUrl}/api/v2/cinema/movie/${id}`).pipe(
      map((response) => response.data),
      prependEnvironmentItem('imgSrc'),
      groupSchedulesByTheater(),
      catchOffline(),
    );

  }

  /**
   * Get a list of theaters from the API
   */
  getTheaters(): Observable<Theater[]> {

    return this.http.get<APIData<Theater[]>>(`${environment.apiUrl}/api/v2/cinema/theaters`).pipe(
      map((response) => response.data),
      prependEnvironmentList('logoSrc'),
      catchOffline(),
    );

  }

  /**
   * Get a theater from the API
   */
  getTheater(id: string | number): Observable<Theater> {

    return this.http.get<APIData<Theater>>(`${environment.apiUrl}/api/v2/cinema/theater/${id}`).pipe(
      map((response) => response.data),
      prependEnvironmentItem('logoSrc'),
      groupSchedulesByMovie(),
      catchOffline(),
    );

  }

  /**
   * Get a list of slides from the API
   */
  getSlides(): Observable<Slide[]> {

    return this.http.get<APIData<Slide[]>>(`${environment.apiUrl}/api/v2/cinema/slides`).pipe(
      map((response) => response.data),
      prependEnvironmentList('imgSrc', 'imgSrcFull'),
    );

  }

}
