import { getMovies } from '@/API/getData';
import { Movie } from '@/types/Movie';
import { ChangeEvent, FC, memo, useEffect, useRef, useState } from 'react';
import { MovieCard } from './movieCard';
import Pagination from '@mui/material/Pagination';

interface Props {
  searchQuery: string
}

export const MovieList: FC<Props> = memo(
  ({ searchQuery }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const MovieListRef = useRef<HTMLDivElement>(null);

    const loadMovies = async () => {
      const data = await getMovies(searchQuery, page);

      console.log(data)

      setTotalPages(data.total_pages);
      setMovies(data.results);
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
        <div className='movie-list__grid'>
          {
            movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          }
        </div>

        <div className="movie-list__pagination">
          <Pagination
            count={totalPages}
            onChange={handlePageChange}
            sx={{
              margin: '50px'
            }}
          />
        </div>
      </div>
    );
  },
);
