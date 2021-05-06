/* *** Collections *** */

/* Dynamic indexes */

interface Projects {
  [key: string]: {
    type: string;
  };
}

const projects: Projects = {
  app: {
    type: 'application',
  },
  storage: {
    type: 'library'
  },
};

interface ProjectConfig {
  type: string;
}

const projectsMap = new Map<string, ProjectConfig>([
  ['app', { type: 'application' }],
  ['storage', { type: 'library' }],
]);



/* *** Union types / intersections *** */

/* Null */

let title: string | null = null;
title = `The Matrix`;

/* Discrimated union */

// interface JsonSchema {
//   type: 'string' | 'number';
//   maxLength?: number;
//   multipleOf?: number;
// }

interface JsonSchemaString {
  type: 'string';
  maxLength?: number;
}

interface JsonSchemaNumber {
  type: 'number';
  multipleOf?: number;
}

type JsonSchema = JsonSchemaString | JsonSchemaNumber;



/* *** Unknown type *** */

function getFromStorage(key: string): unknown {

  const dataString = localStorage.getItem(key);

  let data = null;

  if (dataString !== null) {

    try {
      data = JSON.parse(dataString);
    } catch {
      // Nothing
    }

  }

  return data;

}

const token = getFromStorage('token');

// token.substr(2);



/* *** Variable types: generics *** */

/* Class / interface generic */

interface ApiData<T> {
  data: T;
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
  .then((response) => response.json() as Promise<ApiData<Movie>>)
  .then(({ data }) => {
    console.log(data.title);
  });

/* Function generic */

function fetchJson<DataType>(url: string): Promise<DataType> {

  return fetch(url)
    .then((response) => response.json());

}

fetchJson<Movie>(`/api/cinema/movie/1`).then((movies) => {
  console.log(movies);
});

/* Function generic to preserve a type */

function filterArray<T>(list: T[]): T[] {

  return list.filter((item) => item !== undefined);

}

const moviesList: string[] = [`The Matrix`, `The Matrix Reloaded`, `The Matrix Revolutions`];

const filteredMoviesList = filterArray(moviesList);


function testConstraint<T extends unknown[]>() {}



/* *** Built-in types *** */

/* Partial / Required */

function updateMovie(id: string, data: Partial<Movie>): void {

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

updateMovie('1', { title: `Matrix Reloaded` });

/* Pick / Omit */

const movieWithTitleOnly: Pick<Movie, 'title'> = {
  title: `The Matrix`,
};

const movieWithIdAndTitle: Omit<Movie, 'summary'> = {
  id: '1',
  title: `The Matrix`,
};

const movieWithoutSummary: Pick<Movie, 'title' | 'id'> = {
  id: '1',
  title: `The Matrix`,
};

export const _zzz = {};
