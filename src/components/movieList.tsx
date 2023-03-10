import { getMovies } from '@/src/API/getData';
import { Movie } from '@/src/types/Movie';
import { ChangeEvent, FC, memo, useEffect, useRef, useState } from 'react';
import { MovieCard } from './movieCard';
import Pagination from '@mui/material/Pagination';
import { Loader } from './loader';
import Alert from '@mui/material/Alert';
import { CustomAlert } from './alert';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  searchQuery: string
  movies: Movie[]
  isLoading: boolean
  error: string
  totalPages: number
  page: number
}

export const MovieList: FC<Props> = memo(
  ({
    searchQuery,
    error,
    isLoading,
    movies,
    page,
    totalPages
  }) => {
    const router = useRouter();
    const MovieListRef = useRef<HTMLDivElement>(null);

    const handlePageChange = (event: ChangeEvent<unknown>, newPage: number) => {
      if (searchQuery) {
        router.push({
          query: {
            search: searchQuery,
            page: newPage
          }
        });
      }

      if (MovieListRef.current) {
        MovieListRef.current.scrollTo({
          top: 0,
          behavior: "smooth"
        });;
      }
    };

    return (
      <div className='movie-list' ref={MovieListRef}>
        {isLoading && <Loader />}

        {
          !isLoading && error
          && <CustomAlert text={error} type='error' />
        }

        {
          !isLoading && !error && movies.length > 0
          && <>
            <div className='movie-list__grid'>
              {
                movies.map(movie => (
                  <Link key={movie.id} href={`/movies/${movie.id}`}>
                    <MovieCard movie={movie} />
                  </Link>
                ))
              }
            </div>

            <div className="movie-list__pagination">
              <Pagination
                page={page}
                count={totalPages}
                onChange={handlePageChange}
                sx={{
                  margin: '50px'
                }}
              />
            </div>
          </>
        }

        {
          !isLoading && !error && movies.length === 0
          && <CustomAlert
            text="there isn't such movie or you made mistake while typing"
            type='warning'
          />
        }
      </div>
    );
  },
);
