export const API_KEY = '?api_key=4218253ea3996b68858664a469ad2ba1';

export const BASE_URL = 'https://api.themoviedb.org/3';

export const URL_FOR_SEARCH = `${BASE_URL}/search/movie${API_KEY}&query=`;

export const IMG_BASE_PATH = 'https://image.tmdb.org/t/p/w500/';

export const GET_MOVIE_INFO_URL = (id: number) => (
  `${BASE_URL}/movie/${id}${API_KEY}&language=en-US`
);

export const GET_MOVIE_TRAILERS_URL = (movieId: number) => (
  `${BASE_URL}/movie/${movieId}/videos${API_KEY}&language=en-US`
)