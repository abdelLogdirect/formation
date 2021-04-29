import express from 'express';

export const locales = ['fr', 'en'];

const defaultErrorMessage = `Unknown error.`;

/** @type { {[k: string]: Map<string, string>} } */
const errorMessages = {
  fr: new Map([
    ['emailMissing', `L'adresse e-mail est obligatoire.`],
    ['emailInvalid', `L'adresse e-mail est invalide.`],
    ['passwordRequired', `Le mot de passe est obligatoire.`],
    ['passwordNotMatching', `Les deux mots de passe ne sont pas identiques.`],
    ['registerFailed', `Inscription refusée.`],
    ['accountAlreadyExisting', `Ce compte existe déjà.`],
    ['loginFailed', `Authentification refusée.`],
    ['accountNotExisting', `Ce compte n'existe pas.`],
    ['passwordWrong', `Mot de passe incorrect.`],
    ['bookingFailed', `Réservation impossible`],
  ]),
  en: new Map([
    ['emailMissing', `E-mail is required.`],
    ['emailInvalid', `E-mail is not valid.`],
    ['passwordRequired', `Password is required.`],
    ['passwordNotMatching', `Passwords are not matching.`],
    ['registerFailed', `Registration failed.`],
    ['accountAlreadyExisting', `This account already exists.`],
    ['loginFailed', `Login failed.`],
    ['accountNotExisting', `This account does not exist.`],
    ['passwordWrong', `Incorrect password.`],
    ['bookingFailed', `Booking failed`],
  ])
};

export class I18N {

  /**
   * @param {express.Request} req
   * @returns {string}
   */
  static getUserLocale(req) {
    const locale = req.acceptsLanguages(locales);
    return (typeof locale === 'string') ? locale : 'en';
  }

  /**
   * @param {express.Request} req
   * @param {string} label
   * @returns {string}
   */
  static getErrorMessage(req, label) {

    const locale = this.getUserLocale(req);

    const errorMessagesLocalized = errorMessages[locale];

    if (!errorMessagesLocalized) {
      return defaultErrorMessage;
    } else {
      return errorMessagesLocalized.get(label) || defaultErrorMessage;
    }

  }

}
