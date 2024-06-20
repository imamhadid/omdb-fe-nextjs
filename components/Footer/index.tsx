import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function AppFooter() {

    return (
        <Container component="footer">
            <Box
                sx={{
                    py: { xs: 4, sm: 8 },
                    display: 'grid',
                    gridAutoColumns: '1fr',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 4,
                    gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '1fr 1.75fr', lg: '1fr 1fr' },
                    gridTemplateRows: 'auto',
                    '& a:not(.MuiIconButton-root)': {
                        pt: 0.5,
                        pb: 0.5,
                        color: 'text.secondary',
                        typography: 'body2',
                        '&:hover': {
                            color: 'primary.main',
                            textDecoration: 'underline',
                        },
                    },
                }}
            >
            </Box>
            <Divider />
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems="center"
                justifyContent={{ sm: 'space-between' }}
                gap={{ xs: 2, sm: 1 }}
                sx={{ my: 4 }}
            >
                <Typography color="text.tertiary" variant="caption" fontWeight={400}>
                    Copyright © {new Date().getFullYear()} Made with Love.
                </Typography>
                <Stack spacing={1} direction="row" flexWrap="wrap" useFlexGap>
                    <IconButton
                        target="_blank"
                        rel="noopener"
                        href="https://github.com/imamhadid"
                        aria-label="github"
                        title="GitHub"
                        size="small"
                    >
                        <GitHubIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        target="_blank"
                        rel="noopener"
                        href="https://x.com/adittimurraya"
                        aria-label="X/twitter"
                        title="X"
                        size="small"
                    >
                        <XIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        target="_blank"
                        rel="noopener"
                        href="https://www.linkedin.com/in/hadit1297/"
                        aria-label="linkedin"
                        title="LinkedIn"
                        size="small"
                    >
                        <LinkedInIcon fontSize="small" />
                    </IconButton>
                </Stack>
            </Stack>
        </Container>
    );
}