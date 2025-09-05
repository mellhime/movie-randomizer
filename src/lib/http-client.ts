type TQueryParams = Record<string, string | number | undefined>;

interface IHttpOptions {
  query?: TQueryParams;
  headers?: HeadersInit;
  body?: Record<string, string>;
}

const BASE_URL = "https://api.themoviedb.org/3/";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${import.meta.env.VITE_MOVIES_API_AUTH_TOKEN}`,
};

const toQuery = <T extends object>(dto?: T): TQueryParams => {
  if (!dto) return {};

  const query: TQueryParams = {};
  for (const [key, value] of Object.entries(dto)) {
    if (value !== undefined) {
      query[key] = String(value);
    }
  }
  return query;
};

const get = (path: string, options: IHttpOptions = {}) => {
  const params = new URLSearchParams(toQuery(options.query));
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

export { get, post };
