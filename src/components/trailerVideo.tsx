import { Typography } from '@mui/material';
import { FC, memo } from 'react';

interface Props {
  trailerKey: string,
}

export const TrailerVideo: FC<Props> = memo(
  ({ trailerKey }) => {
    return (
      <>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            textAlign: 'center'
          }}
        >
          Trailer
        </Typography>
        <iframe
          className='trailer'
          width="95%"
          height="75%"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        />
      </>
    );
  },
);
