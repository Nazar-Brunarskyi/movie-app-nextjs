import { Search } from '../src/components/search'
import Head from 'next/head'
import { useRouter } from 'next/router';
import cn from 'classnames';
import { MovieList } from '@/src/components/movieList';


export default function Home() {
  const router = useRouter();
  const { search } = router.query;

  const normalizedSearch = typeof search === 'string'
    ? search
    : search?.join();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div
          className={cn({
            container: true,
            'container--with-movies': search,
          })}
        >
          <Search />

          {normalizedSearch && <MovieList searchQuery={normalizedSearch} />}
        </div>
      </main>
    </>
  )
}