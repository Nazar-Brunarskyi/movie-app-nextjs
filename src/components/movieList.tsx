import { getMovies } from '@/API/getData';
import { Movie } from '@/types/Movie';
import { ChangeEvent, FC, memo, useEffect, useRef, useState } from 'react';
import { MovieCard } from './movieCard';
import Pagination from '@mui/material/Pagination';
import { Loader } from './loader';
import Alert from '@mui/material/Alert';
import { CustomAlert } from './alert';

interface Props {
  searchQuery: string
}

export const MovieList: FC<Props> = memo(
  ({ searchQuery }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const MovieListRef = useRef<HTMLDivElement>(null);

    const loadMovies = async () => {
      setIsLoading(true);

      const data = await getMovies(searchQuery, page);

      if (!data) {
        setError('problem with loading, try later');
        setMovies([]);
      } else {
        setTotalPages(data.total_pages);
        setMovies(data.results);
      }

      setIsLoading(false);
    }

    const handlePageChange = (event: ChangeEvent<unknown>, newPage: number) => {
      setPage(newPage);
      if (MovieListRef.current) {
        MovieListRef.current.scrollTo({
          top: 0,
          behavior: "smooth"
        });;
      }
    };

    useEffect(() => {
      loadMovies();
    }, [searchQuery, page])

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
                  <MovieCard key={movie.id} movie={movie} />
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
