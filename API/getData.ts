import { MovieResponse } from "../types/responseType";
import { Trailer, TrailerResponse } from "../types/trailerObject";
import { URL_FOR_SEARCH } from "./API_VARIABLES";

export function getData<T>(url: string): Promise<T> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('something went wrong, try later!')
      }

      return response.json();
    })
    .catch(error => alert(error.message));
}

export function getMovies(query: string) {
  const preparedQuery = query
    .split(' ')
    .filter(Boolean)
    .join(' ')
    .replaceAll(' ', '%20')
    .trim();

  return getData<MovieResponse>(URL_FOR_SEARCH + preparedQuery)
    .then(data => (
      data.results
    ))
}
