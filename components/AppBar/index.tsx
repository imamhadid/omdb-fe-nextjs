import {
    AppBar,
    Grid,
    Toolbar,
    Typography,
} from '@mui/material';

export default function AppBars() {

    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item>
                        <Typography variant="h6" noWrap>
                            IMovies
                        </Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}