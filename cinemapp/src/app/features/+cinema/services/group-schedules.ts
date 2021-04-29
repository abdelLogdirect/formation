import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

import { preprendProperties } from '@core/api';

import { Movie } from '../models/movie.model';
import { Theater } from '../models/theater.model';

/**
 * Group schedules by theater or by movie
 */
function groupSchedules<T extends Movie | Theater>(groupBy: 'movie' | 'theater'): (movieOrTheater: T) => T {

  return (movieOrTheater) => {

    const rawSchedules = movieOrTheater.schedules ?? [];

    /* `Set` is used to remove duplicates */
    const schedulesGroups = Array.from(new Set<number>(rawSchedules
      .map((schedule) => schedule[groupBy].id)))
      .map((id) => rawSchedules.filter((schedule) => schedule[groupBy].id === id))
      .map((schedules) => schedules.map((schedule) => ({
        ...schedule,
        [groupBy]: groupBy === 'movie' ?
          preprendProperties(schedule[groupBy], 'imgSrc') :
          preprendProperties(schedule[groupBy], 'logoSrc'),
      })));

    /* Redefine the object by keeping all existing properties and adding schedules' groups */
    return { ...movieOrTheater, schedulesGroups };

  };

}

/**
 * RxJS operator to group schedules by theater
 */
export function groupSchedulesByTheater(): OperatorFunction<Movie, Movie> {

  return map(groupSchedules('theater'));

}

/**
 * RxJS operator to group schedules by movie
 */
export function groupSchedulesByMovie(): OperatorFunction<Theater, Theater> {

  return map(groupSchedules('movie'));

}
