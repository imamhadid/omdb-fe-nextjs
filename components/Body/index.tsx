'use client'
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
    Grid,
    InputBase,
    Typography,
    Autocomplete,
    TextField,
    Button,
} from '@mui/material';

// Icons
import SearchIcon from '@mui/icons-material/Search';

// Util
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

// Component
import ListRowItem from '@/components/List';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    height: 55,
    border: `2px solid ${theme.palette.divider}`, // Add border style
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function BodyList({ sendMovieIdToParent }: { sendMovieIdToParent: (id: string) => void }) {

    const [expanded, setExpanded] = React.useState(false);
    const currentYear = new Date().getFullYear();
    const [movies, setMovies] = React.useState<any>([{
        Title: `Loading`,
        Poster: "N/A"
    }]);
    const [search, setSearch] = React.useState<string | null>(null);
    const [type, setType] = React.useState<{ label: string } | null>(null);
    const [year, setYear] = React.useState<Date | null>(null);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);

    const fetchMovies = async (query: string, year?: number, type?: string, page?: number) => {
        try {
            setLoading(true);
            const url = new URL(`https://www.omdbapi.com/?apikey=a48a9564`);
            url.searchParams.append('s', query);
            if (year) {
                url.searchParams.append('y', year.toString());
            }
            if (type) {
                url.searchParams.append('type', type);
            }
            if (page) {
                url.searchParams.append('page', page.toString());
            }

            const response = await fetch(url.toString());
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.Error) {
                throw new Error(data.Error);
            }
            setMovies(data.Search || []);
            setTotalPages(Math.ceil(parseInt(data.totalResults, 10) / 10));
            setError(null);
        } catch (error: any) {
            console.error('Error fetching data:', error);
            setError(error.message || 'Failed to fetch data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchMovies(search!, year?.getFullYear(), type?.label, page);
    }, [search, year, type, page]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handlePreviousPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handleMovieIdFromList = (id: string) => {
        sendMovieIdToParent(id);
    };

    return (
        <Grid container spacing={2} marginTop={10} sx={{ justifyContent: 'center' }}>
            <Grid item xs={10} sx={{
                backgroundColor: `white`,
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Grid item>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            size='medium'
                            inputProps={{ 'aria-label': 'search' }}
                            value={search || ''}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Search>
                </Grid>

                <Grid marginX={5}>
                    <Autocomplete
                        disablePortal
                        options={option}
                        sx={{ width: 300, mb: 3 }}
                        renderInput={(params) => <TextField {...params} label="Type" />}
                        defaultValue={option[0]}
                        disableClearable={true}
                        onChange={(event, newValue) => setType(newValue)}
                    />
                </Grid>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label={'Year'}
                        views={['year']}
                        maxDate={new Date(currentYear, 11, 31)}
                        value={year}
                        onChange={(newValue: Date | null) => setYear(newValue)}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={10} sx={{
                backgroundColor: `white`,
                display: 'flex',
                justifyContent: 'center'
            }}>
                {loading ? (
                    <Typography variant="h6">Loading...</Typography>
                ) : error ? (
                    <Typography variant="h6" color="error" sx={{ mt: 4 }}>
                        {error}
                    </Typography>
                ) : movies.length > 0 ? (
                            <ListRowItem movies={movies} sendMovieIdToParent={handleMovieIdFromList} />
                ) : (
                    <Typography variant="h6" sx={{ mt: 4 }}>No results found</Typography>
                )}
            </Grid>
            <Grid item xs={10} sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px'
            }}>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={page === 1 || loading}
                    onClick={handlePreviousPage}
                >
                    Previous
                </Button>
                <Typography variant="body1">Page {page} of {totalPages}</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={page === totalPages || loading}
                    onClick={handleNextPage}
                >
                    Next
                </Button>
            </Grid>
        </Grid>
    );
}

const option = [
    { label: 'movie' },
    { label: 'series' },
    { label: 'episode' },
];
