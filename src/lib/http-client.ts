type IQueryParams = Record<string, string | undefined>;

interface IHttpOptions {
  query?: IQueryParams;
  headers?: HeadersInit;
  body?: Record<string, string>;
}

const BASE_URL = "https://api.themoviedb.org/3/";
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGMwZmQzOGU4MGM2MDNlYWYxNTU2ZmU5YzYxYjMzZCIsIm5iZiI6MTc1NjIxMjEzNi4yNTMsInN1YiI6IjY4YWRhYmE4ZWFmNWM4MmQ3ODQ0OThkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5efP0iGItwjEn3IZupDgVl8z7JN6IiNaRFBNvo0HEgc";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${AUTH_TOKEN}`,
};

const get = (path: string, options: IHttpOptions = {}) => {
  const params = new URLSearchParams(options.query);
  const pathWithQuery = `${BASE_URL}/${path}${params}`;

  return fetch(pathWithQuery, {
    headers: {
      ...DEFAULT_HEADERS,
      ...options.headers,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      // todo ErrorHandler
      throw error;
    });
};

const post = (path: string, options: IHttpOptions = {}) => {
  return fetch(path, {
    method: "POST",
    body: JSON.stringify(options.body),
    headers: {
      ...options.headers,
      ...DEFAULT_HEADERS,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      // todo ErrorHandler
      throw error;
    });
};

export { get, type IQueryParams, post };
