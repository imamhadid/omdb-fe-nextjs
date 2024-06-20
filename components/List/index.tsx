import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ListItemButton } from '@mui/material';
import { useRouter } from "next/navigation";

export default function ListRowItem(Props: {
    movies: {
        Title: string;
        Year: string;
        Poster: string;
        Type: string;
    }[]
}) {

    const { movies } = Props;
    const router = useRouter();
    const handlePosterClick = (movie: any) => {
        router.push(`?id=${movie.imdbID}`);
    };

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {movies.map((movie, index) => (
                <React.Fragment key={index}>
                    <ListItemButton onClick={() => handlePosterClick(movie)} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={movie.Title} src={movie.Poster !== 'N/A' ? movie.Poster : '/static/images/avatar/1.jpg'} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={movie.Title}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {movie.Year}
                                    </Typography>
                                    {` — ${movie.Type}`}
                                </React.Fragment>
                            }
                        />
                    </ListItemButton>
                    {index < movies.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
            ))}
        </List>
    );
}
