import { convertSnakeToCamel } from "./helpers";

type TQueryParams = Record<string, string | number | undefined>;
type TUrlSearchParamsArgument = ConstructorParameters<
  typeof URLSearchParams
>[0];

interface IHttpOptions {
  query?: TQueryParams;
  headers?: HeadersInit;
  body?: Record<string, string>;
}

const BASE_URL = "https://api.themoviedb.org/3";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.MOVIES_API_AUTH_TOKEN}`,
};

const stringifyParams = <T extends object>(
  dto?: T,
): TUrlSearchParamsArgument => {
  if (!dto) return {};

  const query: TUrlSearchParamsArgument = {};
  for (const [key, value] of Object.entries(dto)) {
    if (value !== undefined) {
      query[key] = String(value);
    }
  }
  return query;
};

const preparedPath = (path: string, query?: TQueryParams) => {
  const basePath = `${BASE_URL}/${path}`;
  if (!query) return basePath;

  const params = new URLSearchParams(stringifyParams(query));
  return `${basePath}?${params}`;
};

const get = (path: string, options: IHttpOptions = {}) => {
  return fetch(preparedPath(path, options.query), {
    headers: {
      ...DEFAULT_HEADERS,
      ...options.headers,
    },
  })
    .then((response) => {
      return response.json().then((body) => ({
        data: convertSnakeToCamel(body),
        headers: response.headers,
      }));
    })
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
