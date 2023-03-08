import {
  FC,
  useCallback,
  useState,
  useEffect,
  memo,
} from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { getMovies } from '../../API/getData';
import { debounce } from 'lodash';
import LoadingButton from '@mui/lab/LoadingButton';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router'
import cn from 'classnames';

export const Search: FC = memo(
  () => {
    const router = useRouter();

    const { search } = router.query
    const [value, setValue] = useState('');
    const [options, setOptions] = useState<string[]>([]);

    const getOptions = async (query: string) => {
      if (query.trim() === '') {
        setOptions([]);
        return;
      }

      const movies = await (
        await getMovies(query)
      ).results;

      const movieTitles = movies.map(movie => movie.original_title)

      const uniqueMovieTitles = new Set(movieTitles);

      setOptions(
        Array.from(uniqueMovieTitles),
      );
    }

    const debouncedGetOptions = useCallback(debounce(getOptions, 300), []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      debouncedGetOptions('');
      setOptions([]);

      if (value) {
        router.push({
          query: {
            search: value,
          }
        });

        return;
      }

      router.push({
        query: {}
      });
    }

    const handleChoiceOfOption = (event: any, newValue: string | null) => {
      if (newValue) {
        setValue(newValue);
      }
    };

    useEffect(() => {
      debouncedGetOptions(value)
    }, [value]);

    useEffect(() => {
      if (typeof search === 'string') {
        setValue(search);

        return;
      }

      if (Array.isArray(search)) {
        setValue(search.join(' '));

        return;
      }
    }, [search]);

    return (
      <div
        className={cn({
          search: true,
          'search--with-movies': search,
        })}
      >
        <form
          style={{
            display: 'flex',
            width: '100%'
          }}
          onSubmit={handleSubmit}
        >
          <Autocomplete
            disablePortal
            value={value}
            id="combo-box-demo"
            getOptionLabel={(option) => (option ? `${option}` : '')}
            options={options}
            onChange={handleChoiceOfOption}
            freeSolo
            sx={{ width: '50%', margin: '0px auto', display: 'flex' }}
            renderInput={(params) => (
              <>
                <TextField
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={() => setOptions([])}
                  {...params}
                  label="Enter movie"
                  sx={{ backgroundColor: '#ffffff3e', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)', borderRadius: '4px' }}
                  className='TextField-autocomplete'
                />

                <LoadingButton
                  endIcon={<SearchIcon />}
                  loading={false}
                  loadingPosition="end"
                  variant="contained"
                  type="submit"
                  sx={{ margin: '0 20px' }}
                />
              </>
            )}
          />
        </form>
      </div>
    );
  },
);