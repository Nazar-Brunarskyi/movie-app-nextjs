/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, memo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Movie } from '../types/Movie';
import { GET_MOVIE_INFO_URL } from '../API/API_VARIABLES';

interface Props {
  movie: Movie,
}

export const MovieCard: FC<Props> = memo(
  ({ movie }) => {
    const {
      title,
      poster_path,
      original_title,
      release_date,
    } = movie;

    console.log(movie);
    console.log(GET_MOVIE_INFO_URL(movie.id));

    const photoPath = poster_path
      ? `https://image.tmdb.org/t/p/w500/${poster_path}`
      : 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';

    return (
      <Card
        sx={{ maxWidth: '100%', height: 400, textDecoration: 'none' }}
      >
        <CardActionArea sx={{ height: 300 }}>
          <CardMedia
            sx={{ height: '95%' }}
            component="img"
            height="350"
            image={photoPath}
            alt={original_title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                minHeight: '95px'
              }}
            >
              {`${title}, (${release_date.split('-')[0]})`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card >
    );
  },
);