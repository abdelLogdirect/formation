import express from 'express';

import { Database } from './database';
import { locales } from './i18n';

export class Cinema {

  /**
   * @param {express.Request} req
   * @returns {Movie[]}
   */
  static getMovies(req) {

    return Database.collection('movies', req).find();

  }

  /**
   * @param {express.Request} req
   * @param {number} id
   * @returns {MovieWithSchedules | null}
   */
  static getMovie(req, id) {

    const request = /** @type {MovieWithSchedules | null} */ (Database.collection('movies', req).findOne(id));

    if (request === null) {
      return null;
    } else {

      const movie = Object.assign({}, request);

      /* S'il y a des séances prévues, remplace les ids des schedules pour les données réelles */
      if (('schedulesIds' in movie) && (movie.schedulesIds != null)) {

        movie.schedules = movie.schedulesIds
          .map((id) => /** @type {Schedule} */ (Database.collection('schedules').findOne(id)))
          .map((schedule) => this.fillScheduleTheater(schedule));

      }

      return movie;

    }

  }

  /**
   * @param {express.Request} req
   * @returns {Category[]}
   */
  static getCategories(req) {

    return Database.collection('categories', req).find();

  }

  /**
   * @returns {Theater[]}
   */
  static getTheaters() {

    return Database.collection('theaters').find();

  }

  /**
   * @param {express.Request} req
   * @param {number} id
   * @returns {TheaterWithSchedules | null}
   */
  static getTheater(req, id) {

    const request = /** @type {TheaterWithSchedules | null} */ (Database.collection('theaters').findOne(id));

    if (request === null) {
      return null;
    } else {

      const theater = Object.assign({}, request);

      /* S'il y a des séances prévues, remplace les ids des schedules pour les données réelles */
      if (('schedulesIds' in theater) && (theater.schedulesIds != null)) {

        theater.schedules = theater.schedulesIds
          .map((id) => /** @type {Schedule} */ (Database.collection('schedules').findOne(id)))
          .map((schedule) => this.fillScheduleMovie(req, schedule));

      }

      return theater;

    }

  }

  /**
   * @param {express.Request} req
   * @param {Schedule} schedule
   * @returns {Schedule}
   */
  static fillScheduleMovie(req, schedule) {

    const newSchedule = Object.assign({}, schedule);

    newSchedule.movie = /** @type {Movie | null} */ (Database.collection('movies', req).findOne(schedule.movieId));

    return newSchedule;

  }

  /**
   * @param {Schedule} schedule
   * @returns {Schedule}
   */
  static fillScheduleTheater(schedule) {

    const newSchedule = Object.assign({}, schedule);

    newSchedule.theater = /** @type {Theater | null} */ (Database.collection('theaters').findOne(schedule.theaterId));

    return newSchedule;

  }

  /** @returns {Slide[]} */
  static getSlides() {

    return Database.collection('slides').find();

  }

  /**
   * @param {express.Request} req
   * @param {Movie} movie
   * @returns {ApiResponse<boolean>}
   */
  static addMovie(req, movie) {

    Database.collection('movies', req).insertOne(movie);

    return { data: true };

  }

  /**
   * @param {express.Request} req
   * @param {Partial<Movie>} movie
   * @returns {ApiResponse<boolean>}
   */
  static updateMovie(req, movie) {

    Database.collection('movies', req).updateOne(movie);

    return { data: true };

  }

  /**
   * @param {number} id
   * @returns {ApiResponse}
   */
  static deleteMovie(id) {

    return this.deleteMovies([id]);

  }

  /**
   * @param {number[]} idList
   * @returns {ApiResponse<boolean>}
   */
  static deleteMovies(idList) {

    for (const locale of locales) {

      Database.collection('movies', locale).deleteMany(idList);

    }

    return { data: true };

  }

}
