import { Movie } from './movie.model';
import { Theater } from './theater.model';

export interface Schedule {
  id: number;
  hour: string;
  movie: Movie;
  theater: Theater;
}
