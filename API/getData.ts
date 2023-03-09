import { MovieResponse } from "../types/responseType";
import { Trailer, TrailerResponse } from "../types/trailerObject";
import { URL_FOR_SEARCH } from "./API_VARIABLES";

export async function getData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('something went wrong, try later!')
    }

    return response.json();
  } catch (err) {
    throw new Error('something went wrong, try later!')
  }


  // return fetch(url)
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('something went wrong, try later!')
  //     }

  //     return response.json();
  //   })
  //   .catch(error => alert(error.message));
}

function normaliseQuery(query: string) {
  return query
    .split(' ')
    .filter(Boolean)
    .join(' ')
    .replaceAll(' ', '%20')
    .trim();
}

export async function getMovies(query: string, page: number = 1) {
  try {
    const normalisedQuery = normaliseQuery(query);

    const data = await getData<MovieResponse>(URL_FOR_SEARCH + normalisedQuery + `&page=${page}`)

    const { results, total_pages } = data;

    return { results, total_pages }
  } catch (err) {
    return false;
  }
}
