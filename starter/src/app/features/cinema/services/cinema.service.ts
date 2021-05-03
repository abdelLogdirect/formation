import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiData } from 'src/app/core-services/api/api-data.model';
import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  constructor(
    private http: HttpClient,
  ) { }

  getMovies(): Observable<Movie[]> {

    return this.http.get<Movie[]>(`/api/v1/cinema/movies`);

  }

  // getMoviesV2(): Observable<ApiData<Movie[]>> {

  //   return this.http.get<ApiData<Movie[]>>(`/api/v2/cinema/movies`);

  // }

  getMovie(id: string): Observable<Movie> {

    return this.http.get<Movie>(`/api/v1/cinema/movie/${id}`);

  }

  // getMovieV2(id: string): Observable<ApiData<Movie>> {

  //   return this.http.get<ApiData<Movie>>(`/api/v2/cinema/movie/${id}`);

  // }

}
