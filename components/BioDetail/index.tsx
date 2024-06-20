import * as React from 'react';
import { Box, Typography, IconButton, Rating, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const BioDetail = ({ id }: { id: string }) => {
    const router = useRouter();

    const handleBackClick = () => {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('id');
        router.replace(newUrl.pathname + newUrl.search);
    };

    const [movies, setMovies] = React.useState<any>({
        Title: 'Loading',
        Poster: 'N/A',
        imdbRating: '0'
    });

    const [value, setValue] = React.useState<number | null>(0);

    const fetchMoviesDetail = async (id: string) => {
        try {
            const url = new URL(`https://www.omdbapi.com/?apikey=a48a9564&i=${id}&plot=full`);
            const response = await fetch(url.toString());
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            handleBackClick();
        }
    };

    React.useEffect(() => {
        fetchMoviesDetail(id);
    }, );

    React.useEffect(() => {
        if (movies.imdbRating) {
            setValue(Number(movies.imdbRating) / 2);
        }
    }, [movies]);

    return (
        <>
            <IconButton onClick={handleBackClick} sx={{ position: 'absolute', top: 16, left: 16, color: 'white' }}>
                <ArrowBackIcon />
            </IconButton>
            <Box sx={{ p: 2, textAlign: 'center', position: 'relative' }}>
                <Typography variant="h4">{movies.Title}</Typography>
                <Typography variant="body1">Type: {movies.Type}</Typography>
                <Box>
                    <Image
                        src={movies.Poster !== 'N/A' ? movies.Poster : '/default_poster.png'}
                        alt={movies.Title}
                        width={250}
                        height={370}
                        objectFit="cover"
                    />
                </Box>
                <Typography variant="body1">
                    Rating imdb: <Rating name="read-only" value={value} readOnly />
                </Typography>

                <Typography variant="body1">
                    Vote imdb: {movies.imdbVotes}
                </Typography>

                <Typography variant="body1">
                    Genre: {movies.Genre}
                </Typography>

                <Typography variant="body1">
                    Awards: {movies.Awards}
                </Typography>

                <Typography variant="body1">
                    Actors: {movies.Actors}
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={6} sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Typography variant="body1">
                            Country: {movies.Country}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Typography variant="body1">
                            Director: {movies.Director}
                        </Typography>
                    </Grid>

                    <Grid item xs={6} sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Typography variant="body1">
                            Language: {movies.Language}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Typography variant="body1">
                            Production: {movies.Production}
                        </Typography>
                    </Grid>

                    <Grid item xs={6} sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Typography variant="body1">
                            Writer: {movies.Writer}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Typography variant="body1">
                            Year: {movies.Year}
                        </Typography>
                    </Grid>

                    <Grid item xs={6} sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Typography variant="body1">
                            Rated: {movies.Rated}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Typography variant="body1">
                            Released: {movies.Released}
                        </Typography>
                    </Grid>

                </Grid>

                <Typography variant="body1">
                    {movies.Plot}
                </Typography>

            </Box>
        </>
    );
};

export default BioDetail;
