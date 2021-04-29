import { Router } from 'express';

import { Cinema } from './services/cinema';
import { Booking } from './services/booking';
import { Autocomplete } from './services/autocomplete';
import { Account } from './services/account';
import { Database } from './services/database';
import { Validation } from './services/validation';

export const publicRoutes = Router();
export const publicFlatRoutes = Router();
export const adminRoutes = Router();

/* Requêtes des slides */
publicRoutes.get('/cinema/slides', (_, res) => {

  /** @type {ApiResponse<Slide[]>} */
  const json = { data: Cinema.getSlides() };

  res.json(json);

});

/* Requêtes de tous les films */
publicRoutes.get('/cinema/movies', (req, res) => {

  /** @type {ApiResponse<Movie[]>} */
  const json = { data: Cinema.getMovies(req) };

  res.json(json);

});

publicFlatRoutes.get('/cinema/movies', (req, res) => {

  /** @type {Movie[]} */
  const json = Cinema.getMovies(req);

  res.json(json);

});

/* Requêtes d'un film spécifique */
publicRoutes.get('/cinema/movie/:id', (req, res) => {

  const id = Validation.getId(req);
  if (!id) {
    res.sendStatus(400);
    return;
  }

  const data = Cinema.getMovie(req, id);
  if (!data) {
    res.sendStatus(404);
    return;
  }

  /** @type {ApiResponse<Movie>} */
  const json = { data };

  res.json(json);

});

publicFlatRoutes.get('/cinema/movie/:id', (req, res) => {

  const id = Validation.getId(req);
  if (!id) {
    res.sendStatus(400);
    return;
  }

  /** @type {Movie | null} */
  const data = Cinema.getMovie(req, id);

  if (!data) {
    res.sendStatus(404);
    return;
  }

  res.json(data);

});

/* Requêtes de toutes les catégories de films */
publicRoutes.get('/cinema/categories', (req, res) => {

  /** @type {ApiResponse<Category[]>} */
  const json = { data: Cinema.getCategories(req) };

  res.json(json);

});

/* Requêtes de tous les cinémas */
publicRoutes.get('/cinema/theaters', (_, res) => {

  /** @type {ApiResponse<Theater[]>} */
  const json = { data: Cinema.getTheaters() };

  res.json(json);

});

publicFlatRoutes.get('/cinema/theaters', (_, res) => {

  /** @type {Theater[]} */
  const json = Cinema.getTheaters();

  res.json(json);

});

/* Requêtes d'un cinéma spécifique */
publicRoutes.get('/cinema/theater/:id', (req, res) => {

  const id = Validation.getId(req);
  if (!id) {
    res.sendStatus(400);
    return;
  }

  const data = Cinema.getTheater(req, id);
  if (!data) {
    res.sendStatus(404);
    return;
  }

  /** @type {ApiResponse<Theater>} */
  const json = { data };
  res.json(json);

});

publicFlatRoutes.get('/cinema/theater/:id', (req, res) => {

  const id = Validation.getId(req);
  if (!id) {
    res.sendStatus(400);
    return;
  }

  /** @type {Theater | null} */
  const data = Cinema.getTheater(req, id);
  if (!data) {
    res.sendStatus(404);
    return;
  }

  res.json(data);

});

/* Requêtes de tous les cinémas */
publicRoutes.post('/book', (req, res) => {

  const { schedule: id } = req.body;

  if ((typeof id !== 'number')) {
    res.sendStatus(400);
    return;
  }

  /** @type {ApiResponse<Reservation>} */
  const json = Booking.book(req, id);

  res.json(json);

});

publicRoutes.get('/autocomplete/:city', (req, res) => {

  /** @type {ApiResponse<string[]>} */
  const json = { data: Autocomplete.getSuggestions(req.params.city) };

  res.json(json);

});

/* Requête d'inscription */
publicRoutes.post('/account/register', (req, res) => {

  res.json(Account.register(req));

});

/* Requête de tentative de connexion */
publicRoutes.post('/account/login', (req, res) => {

  res.json(Account.login(req));

});

/* Requête de déconnexion */
publicRoutes.post('/account/logout', (_, res) => {

  res.json();

});

/* Requête de tentative de connexion */
publicRoutes.get('/account/available/:email', (req, res) => {

  res.json(Account.isAccountAvailable(req));

});

/* Administration */
adminRoutes.put('/movie', (req, res) => {

  const movie = /** @type {Movie} */ (Validation.escape(req.body));

  res.json(Cinema.addMovie(req, movie));

});

adminRoutes.post('/movie', (req, res) => {

  const movie = /** @type {Movie} */ (Validation.escape(req.body));

  res.json(Cinema.updateMovie(req, movie));

});

adminRoutes.delete('/movie/:id', (req, res) => {

  const id = Validation.getId(req);

  if (!id) {
    res.sendStatus(400);
    return;
  }

  /** @type {ApiResponse<boolean>} */
  const json = Cinema.deleteMovie(id);

  res.json(json);

});

adminRoutes.delete('/movies/:ids', (req, res) => {

  const ids = !('ids' in req.params) ? [] :
    /** @type {string} */ (req.params.ids).split(',').map((id) => Number.parseInt(id)).filter((id) => id);

  if (ids.length === 0) {
    res.sendStatus(400);
    return;
  }

  /** @type {ApiResponse<boolean>} */
  const json = Cinema.deleteMovies(ids);

  res.json(json);

});

adminRoutes.post('/reset', (_, res) => {

  Database.reset();

  /** @type {ApiResponse<boolean>} */
  const json = { data: true };

  res.json(json);

});

publicRoutes.get('*', (_, res) => {

  res.sendStatus(404);

});

publicFlatRoutes.get('*', (_, res) => {

  res.sendStatus(404);

});
