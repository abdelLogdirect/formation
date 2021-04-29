import validator from 'validator';
import jwt from 'jsonwebtoken';
import express from 'express';

import { Database } from './database';
import { config } from './config';
import { I18N } from './i18n';

export class Account {

  /** @returns {User[]} */
  static get users() {

    return Database.collection('users').find();

  }

  /**
   * @param {User} user
   * @returns {void}
   */
  static saveUser(user) {

    Database.collection('users').insertOne(user);

  }

  /**
   * @param {string} email
   * @returns {User | false}
   */
  static isUserExisting(email) {

    return Database.collection('users').findOne({ email }) || false;

  }

  /**
   * @param {UserInput} inputs
   * @returns {UserInput}
   */
  static filterInputs(inputs) {

    const email = validator.escape((typeof inputs.email === 'string') ? inputs.email : '');

    let password = inputs.password;

    if (typeof inputs.password === 'object') {

      let { password1, password2 } = inputs.password;
      password1 = (typeof password1 === 'string') ? password1 : '';
      password2 = (typeof password2 === 'string') ? password2 : '';

      password = { password1, password2 };

    } else if (typeof password !== 'string') {
      password = '';
    }

    return { email, password };

  }

  /**
   * @param {express.Request} req
   * @param {UserInput} inputs
   * @returns {string[]}
   */
  static validateInputs(req, inputs) {

    /* Vérification des données (champs obligatoires, formats...) */
    let errors = [];

    if (validator.isEmpty(inputs.email)) {
      errors.push(I18N.getErrorMessage(req, 'emailMissing'));
    } else if (!validator.isEmail(inputs.email)) {
      errors.push(I18N.getErrorMessage(req, 'emailInvalid'));
    }

    if ((typeof inputs.password === 'string') && validator.isEmpty(inputs.password)) {
      errors.push(I18N.getErrorMessage(req, 'passwordRequired'));
    } else if (typeof inputs.password === 'object') {

      let { password1, password2 } = inputs.password;
      password1 = (typeof password1 === 'string') ? password1 : '';
      password2 = (typeof password2 === 'string') ? password2 : '';

      if (!password1 && !password2) {
        errors.push(I18N.getErrorMessage(req, 'passwordRequired'));
      } else if (password1 !== password2) {
        errors.push(I18N.getErrorMessage(req, 'passwordNotMatching'));
      }

    }

    return errors;

  }

  /**
   * @param {UserInput} inputs
   * @returns {User}
   */
  static normalizeInputs(inputs) {

    return {
      email: validator.normalizeEmail(inputs.email) || '',
      hash: (typeof inputs.password === 'string') ? inputs.password : inputs.password.password1
    };

  }

  /**
   * @param {express.Request} req
   * @returns {ApiResponse<boolean>}
   */
  static register(req) {

    /* Filtrage des données utilisateur avec le module validator */
    let inputs = this.filterInputs(req.body);

    let errors = this.validateInputs(req, inputs);

    /* S'il y a des erreurs, on les envoie au client en JSON */
    if (errors.length !== 0) {

      return {
        error: {
          message: I18N.getErrorMessage(req, 'registerFailed'),
          errors,
        }
      };

    } else {

      /** @todo Hash password */

      /* Données formattées finales */
      let userData = this.normalizeInputs(inputs);

      /* Requête de sélection pour vérifier si cet email existe déjà en base */
      if (this.isUserExisting(userData.email)) {

        return {
          error: {
            message: I18N.getErrorMessage(req, 'accountAlreadyExisting'),
          }
        };

      } else {

        /* Sinon insertion du nouveau compte en base */
        this.saveUser(userData);

        return { data: true };

      }

    }

  }

  /**
   * @param {express.Request} req
   * @returns {ApiResponse<LoginResponse>}
   */
  static login(req) {

    /* Filtrage des données utilisateur avec le module validator */
    let inputs = this.filterInputs(req.body);

    let errors = this.validateInputs(req, inputs);

    /* S'il y a des erreurs, on les envoie au client en JSON */
    if (errors.length !== 0) {

      return {
        error: {
          message: I18N.getErrorMessage(req, 'loginFailed'),
          errors,
        },
      };

    } else {

      let userData = this.normalizeInputs(inputs);

      let user = this.isUserExisting(userData.email);

      if (!user) {

        return {
          error: {
            message: I18N.getErrorMessage(req, 'accountNotExisting'),
          },
        };

      } else {

        if (userData.hash !== user.hash) {

          return {
            error: {
              message: I18N.getErrorMessage(req, 'passwordWrong'),
            },
          };

        } else {

          /* Stockage des données utilisateur en session en cas de succès */
          let token = jwt.sign({
            userId: user.id
          }, config.jwtSecret);

          return {
            data: {
              token,
              email: userData.email,
            },
          };

        }

      }

    }

  }

  /**
   * @param {express.Request} req
   * @returns {ApiResponse<boolean>}
   */
  static isAccountAvailable(req) {

    const inputEmail = req.params.email;

    const email = (typeof inputEmail === 'string') ? validator.escape(inputEmail) : '';

    if (email && this.isUserExisting(email)) {

      return {
        error: {
          message: I18N.getErrorMessage(req, 'accountAlreadyExisting'),
        },
      };

    }

    return { data: true };

  }

}
