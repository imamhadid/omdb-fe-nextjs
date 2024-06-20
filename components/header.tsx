'use client'
import React from "react";
import { Typography, Paper, Button, Skeleton, Box } from '@mui/material';
import Image from "next/image";
import Carousel, { carouselClasses } from "./Carousel";
import { useRouter } from "next/navigation";

const HeaderCarousel = ({ sendMovieIdToParent }: { sendMovieIdToParent: (id: string) => void }) => {
    const [movies, setMovies] = React.useState<any>([{
        Title: `Loading`,
        Poster: "N/A"
    }]);
    const router = useRouter();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://www.omdbapi.com/?apikey=a48a9564&y=2024&s=new`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMovies(data.Search || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handlePosterClick = (movie: any) => {
        sendMovieIdToParent(movie.imdbID);
    };

    return (
        <>
            <Carousel
                sx={{
                    mt: 3,
                    [`& .${carouselClasses.dots}`]: {
                        mt: 5,
                    },
                    [`& .${carouselClasses.item} > *`]: {
                        transition: "all 0.5s",
                    },
                    [`& .${carouselClasses.center} > *`]: {
                        transform: "scale(1.2)",
                    },
                }}
                dots={true}
                spacing={4}
                autoPlay
                infinity
                centerMode
            >
                {movies.map((movie: any, i: number) => (
                    <Paper
                        key={`item-${i}`}
                        sx={{ height: 400, background: "#fafafa", m: 3, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Button onClick={() => handlePosterClick(movie)}>
                            {movie.Poster !== "N/A" ? (
                                <Image
                                    src={movie.Poster}
                                    alt={`${movie.Title}`}
                                    width={250}
                                    height={380}
                                    objectFit="cover"
                                />
                            ) : (
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    height={400}
                                    width="100%"
                                    position="relative"
                                >
                                    <Skeleton variant="rectangular" width={250} height={380} />
                                    <Typography
                                        variant="h6"
                                        align="center"
                                        style={{
                                            position: 'absolute',
                                            color: 'black'
                                        }}
                                    >
                                        Image N/A
                                    </Typography>
                                </Box>
                            )}
                            <Typography variant="h6" align="center"
                                style={{
                                    color: 'white',
                                    position: 'absolute',
                                    bottom: '10px',
                                    maxWidth: '250px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    textShadow: '2px 2px 4px black'
                                }}>
                                {movie.Title}
                            </Typography>
                        </Button>
                    </Paper>
                ))}
            </Carousel>
        </>
    );
};

export default HeaderCarousel;
