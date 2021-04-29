import { Database } from './database';

export class Autocomplete {

  /** @returns {string[]} */
  static get data() {

    if (!this._data) {
      this._data = /** @type {string[]} */ (Database.collection('world-cities').find());
    }

    return this._data;

  }

  /**
   * @param {string} input
   * @returns {string[]}
   */
  static getSuggestions(input) {

    return (input.length < 2) ? [] :
      this.data.filter((value) => value.toLowerCase().startsWith(input.toLowerCase())).slice(0, 5);

  }

}
