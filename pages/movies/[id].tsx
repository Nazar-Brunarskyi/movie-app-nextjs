import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import { CustomTable } from '@/src/components/CustomTable';
import { useRouter } from 'next/router';

export default function MediaCard() {
  const router = useRouter();
  const { id } = router.query;

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <div className='movie-page'>
      <Card sx={{
        maxWidth: isSmallScreen ? '100%' : '80%',
        margin: 'auto',
        // minHeight: '100vh'
      }
      }>
        <div className='movie-page__info'>
          <CardMedia
            image="https://image.tmdb.org/t/p/w500//p8c0a159yKnpciQCFsR8BaC23po.jpg"
            title="green iguana"
            sx={{
              height: '300px',
              width: '250px',
              m: '10px'
            }}
          />

          <CustomTable tableRows={[['speed', 1223], ['speed', 1223], ['speed', 1223], ['speed', 1223], ['speed', 1223], ['speed', 1223]]} />
        </div>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </div>
  );
}
