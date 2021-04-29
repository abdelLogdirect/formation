import express from 'express';

import { Database } from './database';
import { Cinema } from './cinema';
import { I18N } from './i18n';

export class Booking {

  /**
   * @param {express.Request} req
   * @param {number} id
   * @returns {ApiResponse<Reservation>}
   */
  static book(req, id) {

    const error = {
      error: {
        message: I18N.getErrorMessage(req, 'bookingFailed'),
      },
    };

    const scheduleQuery = /** @type {Schedule | null} */ (Database.collection('schedules').findOne(id));

    if (!scheduleQuery) {
      return error;
    }

    const schedule = Cinema.fillScheduleTheater(Cinema.fillScheduleMovie(req, scheduleQuery));

    if (!schedule.movie || !schedule.theater) {
      return error;
    }

    return {
      data: {
        movieTitle: schedule.movie.title,
        theaterTitle: schedule.theater.title,
        scheduleId: id,
        scheduleHour: schedule.hour,
      }
    };

  }

}
