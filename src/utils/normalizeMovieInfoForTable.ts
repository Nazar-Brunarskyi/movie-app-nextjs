import { MovieInfo } from "../types/movieInfo";

interface NormalizedInfo {
  [key: string]: string | number
}

const normalizeGenres = (genres: string) => (
  genres
    .trim()
    .split(',')
    .filter(Boolean)
    .join(',')
)

export const normalizeMovieInfoForTable = (movie: MovieInfo) => {
  const normalizedInfo: NormalizedInfo = {};

  normalizedInfo.budget = movie.budget || 'unknown';
  normalizedInfo['release date'] = movie.release_date;
  normalizedInfo.status = movie.status;
  normalizedInfo.tagline = movie.tagline || '-';
  normalizedInfo.duration = movie.runtime;
  normalizedInfo['18+'] = movie.adult ? 'Yse' : 'No';

  normalizedInfo.genres = normalizeGenres(
    movie.genres.reduce((acc, genre) => acc + genre.name + ', ', ''),
  );

  return Object.entries(normalizedInfo);
};