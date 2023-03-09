import { MovieResponse } from "../types/responseType";
import { Trailer, TrailerResponse } from "../types/trailerObject";
import { normaliseQuery } from "../utils/normaliseQuery";
import { GET_MOVIE_TRAILERS_URL, URL_FOR_SEARCH } from "./API_VARIABLES";

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

export async function getTrailersArr(movieId: number) {
  const url = GET_MOVIE_TRAILERS_URL(movieId);

  const data = await getData<TrailerResponse>(url);
  const videos = data.results;
  
  return videos.filter(video => video.type === 'Trailer')
}
