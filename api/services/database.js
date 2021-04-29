import fs from 'fs';
import path from 'path';
import express from 'express';

import { I18N } from './i18n';

export class Database {

  /**
   * @param {string} name
   * @param {express.Request | string} [i18n]
   * @returns {Collection}
   */
  static collection(name, i18n) {

    /** @type {string | null} */
    let locale = null;
    if (i18n) {
      locale = (typeof i18n === 'string') ? i18n : I18N.getUserLocale(i18n);
    }

    const nameLocalized = locale ? `${locale}/${name}` : name;

    if (!databases.has(nameLocalized)) {

      const collectionPath = this.getCollectionPath(nameLocalized);

      databases.set(nameLocalized, new Collection(nameLocalized, JSON.parse(fs.readFileSync(collectionPath, 'utf8'))));

    }

    return /** @type {Collection} */ (databases.get(nameLocalized));

  }

  /**
   * @param {string} name
   * @param {object[]} collection
   */
  static write(name, collection) {

    const collectionPath = this.getCollectionPath(name);

    fs.writeFile(collectionPath, JSON.stringify(collection), (error) => {
      if (error) {
        console.log(error);
      }
    });

  }

  /** @returns {void} */
  static reset() {

    const namesList = [
      'fr/movies',
      'en/movies',
      'fr/categories',
      'en/categories',
      'fr/theaters',
      'en/theaters',
      'schedules',
      'slides',
      'users',
    ];

    namesList.forEach((name) => {

      const collectionPath = this.getCollectionPath(name);
      const collectionBackupPath = this.getCollectionBackupPath(name);

      const collectionBackup = fs.readFileSync(collectionBackupPath, 'utf8');

      fs.writeFile(collectionPath, collectionBackup, (error) => {
        if (error) {
          console.log(error);
        }
      });

    });

  }

  /**
   * @param {string} name
   * @returns {string}
   */
  static getCollectionPath(name) {
    return path.join(__dirname, '..', 'data', `${name}.json`);
  }

  /**
   * @param {string} name
   * @returns {string}
   */
  static getCollectionBackupPath(name) {
    return path.join(__dirname, '..', 'data', 'backup', `${name}.json`);
  }

}

export class Collection {

  /**
   * @param {string} name
   * @param {object[]} data
   */
  constructor(name, data = []) {
    this.name = name;
    /** @type {object[]} */
    this.collection = data;
  }

  /**
   * @param {number | {}} query
   * @returns {object | null}
   */
  findOne(query = {}) {

    const data = this.find((typeof query === 'number') ? { id: query } : query);

    return (data.length > 0) ? data[0] : null;

  }

  /**
   * @param {object} query
   * @returns {object[]}
   */
  find(query = {}) {

    let collection = this.collection;

    for (let condition in query) {

      if (query.hasOwnProperty(condition)) {

        collection = collection.filter((data) => (data.hasOwnProperty(condition)) && (data[condition] === query[condition]));

      }

    }

    return collection;
  }

  /**
   * @param {object} data
   * @returns {Collection}
   */
  insertOne(data) {

    const dataWithId = Object.assign({}, data, { id: this.getNewId() });

    this.collection.push(dataWithId);

    this.save();

    return this;

  }

  /**
   * @returns {number}
   */
  getNewId() {

    return (this.collection.length > 0) ? (Math.max(...this.collection.map((data) => data.id)) + 1) : 1;

  }

  /**
   * @param {object} newData
   * @returns {Collection}
   */
  updateOne(newData) {

    this.collection = this.collection.map((data) => {
      if (data.id === newData.id) {
        return Object.assign(data, newData);
      }
      return data;
    });

    this.save();

    return this;

  }

  /**
   * @param {number} id
   * @returns {Collection}
   */
  deleteOne(id) {

    this.deleteMany([id]);

    return this;

  }

  /**
   * @param {number[]} idList
   * @returns {Collection}
   */
  deleteMany(idList) {

    this.collection = this.collection.filter((data) => (idList.filter((id) => id === data.id).length === 0));

    this.save();

    return this;

  }

  save() {

    Database.write(this.name, this.collection);

  }

}

/** @type {Map<string, Collection>} */
const databases = new Map();
