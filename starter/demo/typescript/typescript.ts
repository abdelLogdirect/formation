/* *** Collections *** */

/* Dynamic indexes */

const projects = {
  app: {
    type: 'application',
  },
  storage: {
    type: 'library'
  },
};



/* *** Union types / intersections *** */

/* Null */

let title = null;
title = `The Matrix`;

/* Discrimated union */

interface JsonSchema {
  type: 'string' | 'number';
  maxLength?: number;
  multipleOf?: number;
}



/* *** Unknown type *** */

function getFromStorage(key: string): any {

  const dataString = localStorage.getItem(key);

  let data = null;

  if (dataString !== null) {

    try {
      data = JSON.parse(dataString);
    } catch {}

  }

  return data;

}

const token = getFromStorage('token');

token.substr(2);



/* *** Variable types: generics *** */

/* Class / interface generic */

interface ApiData {
  data: any;
  error?: {
    message: string;
  };
}

interface Movie {
  id: string;
  title: string;
  summary: string;
}

fetch(`/api/cinema/movie/1`)
  .then((response) => response.json())
  .then((movie) => {
    console.log(movie.title);
  });

/* Function generic */

function fetchJson(url: string): Promise<any> {

  return fetch(url)
    .then((response) => response.json());

}

fetchJson(`/api/cinema/movie/1`).then((movies) => {
  console.log(movies);
});

/* Function generic to preserve a type */

function filterArray(list: any[]): any[] {

  return list.filter((item) => item !== undefined);

}

const moviesList: string[] = [`The Matrix`, `The Matrix Reloaded`, `The Matrix Revolutions`];

const filteredMoviesList = filterArray(moviesList);



/* *** Built-in types *** */

/* Partial / Required */

function updateMovie(id: string, data: Movie): void {

  const database: { movies: Movie[]; } = {
    movies: [{
      id: '1',
      title: `The Matrix`,
      summary: `Best movie ever`,
    }, {
      id: '2',
      title: `The Matrix Reloaded`,
      summary: `Second best movie ever`,
    }],
  };

  let movie = database.movies.find((m) => m.id === id);

  if (movie) {
    movie = { ...movie, ...data };
  }

}

// updateMovie('1', { title: `Matrix Reloaded` });

/* Pick / Omit */

const movieWithTitleOnly = {
  title: `The Matrix`,
};

const movieWithIdAndTitle = {
  id: '1',
  title: `The Matrix`,
};

const movieWithoutSummary = {
  id: '1',
  title: `The Matrix`,
};

export const _zzz = {};
