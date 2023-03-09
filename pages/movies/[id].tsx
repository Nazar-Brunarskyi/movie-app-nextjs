import { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import { CustomTable } from '@/src/components/CustomTable';
import { useRouter } from 'next/router';
import { MovieInfo } from '@/src/types/movieInfo';
import { GET_MOVIE_INFO_URL } from '@/src/API/API_VARIABLES';
import { normalizeMovieInfoForTable } from '@/src/utils/normalizeMovieInfoForTable';
import { getTrailersArr } from '@/src/API/getData';
import { Trailer } from '@/src/types/trailerObject';
import { TrailerVideo } from '@/src/components/trailerVideo';
import Head from 'next/head';

interface Props {
  movie: MovieInfo,
  trailer?: Trailer,
}

interface Contect {
  query: { id: string }
}

const MoviePage: FC<Props> = ({ movie, trailer }) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const {
    title,
    overview,
    poster_path
  } = movie

  // console.log(movie);
  // console.log({trailer});

  const tableRows = normalizeMovieInfoForTable(movie);
  const trailerKey = trailer
    ? trailer.key
    : '_XRnENg_QI0';

  console.log(trailerKey);

  const photoPath = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={overview} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='movie-page'>
          <Card sx={{
            maxWidth: isSmallScreen ? '100%' : '80%',
            margin: 'auto',
          }
          }>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              sx={{
                textAlign: 'center',
                margin: '20px'
              }}
            >
              {title}
            </Typography>
            <div className='movie-page__info'>
              <CardMedia
                image={photoPath}
                title="green iguana"
                sx={{
                  height: '300px',
                  width: '250px',
                  m: '10px'
                }}
              />

              <CustomTable tableRows={tableRows} />
            </div>

            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
              >
                Description:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {overview}
              </Typography>
            </CardContent>

            <TrailerVideo trailerKey={trailerKey} />
          </Card>
        </div>
      </main>
    </>

  );
}

export const getServerSideProps = async (context: Contect) => {
  const { id } = context.query;

  const normalisedId = typeof id === 'string'
    ? +id
    : id ? +id[0] : 0;


  let [movie, trailers] = await Promise.all([
    fetch(GET_MOVIE_INFO_URL(normalisedId)),
    getTrailersArr(normalisedId),
  ]);

  movie = await movie.json();
  const trailer = trailers[0] || null;

  return {
    props: {
      movie,
      trailer,
    }
  }
}

export default MoviePage;
