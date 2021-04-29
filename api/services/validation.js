import express from 'express';
import validator from 'validator';

export class Validation {

  /**
   * @param {unknown} data
   * @returns {unknown}
   */
  static escape(data) {

    /** @type {unknown} */
    let escapedData = null;

    if (data !== null) {

      if (typeof data === 'string') {

        escapedData = validator.escape(data);

      } else if (Array.isArray(data)) {

        escapedData = Validation.escapeArray(data);

      } else if ((typeof data === 'object') && (data !== null)) {

        escapedData = Validation.escapeObject(data);

      } else {

        escapedData = data;

      }

    }

    return escapedData;

  }

  /**
   * @param {object} data
   * @returns {object}
   */
  static escapeObject(data) {

    /** @type {object} */
    let escapedData = {};

    for (let prop in data) {

      if (data.hasOwnProperty(prop)) {

        escapedData[prop] = Validation.escape(data[prop]);

      }

    }

    return escapedData;

  }

  /**
   * @param {unknown[]} data
   * @returns {unknown[]}
   */
  static escapeArray(data) {

    return data.map((value) => Validation.escape(value));

  }

  /**
   * @param {express.Request} req
   * @returns {number | null}
   */
  static getId(req) {

    const id = Number.parseInt(req.params.id, 10) || 1;

    return Number.isNaN(id) ? null : id;

  }

}
