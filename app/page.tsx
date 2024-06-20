'use client'
import * as React from 'react';
import { Box, Grid, Slide } from '@mui/material';
import HeaderCarousel from '@/components/header';
import BodyList from '@/components/Body';
import AppFooter from '@/components/Footer';
import AppBars from '@/components/AppBar';
import BioDetail from '@/components/BioDetail';
import HideOnScroll from '@/components/HideOnScroll';

export default function Home() {
  const [queryId, setQueryId] = React.useState<string | null>(null);
  console.log(queryId)

  const handleMovieIdFromChildren = (id: string | null) => {
    setQueryId(id);
  };

  return (
    <>
      <HideOnScroll>
        <Grid container spacing={2} style={{ position: 'relative' }}>
          <Grid item xs={12}>
            <Box sx={{ zIndex: 10 }}>
              <AppBars />
            </Box>
          </Grid>
          {!queryId && (
            <Grid item xs={12} sx={{ backgroundColor: 'white' }}>
              <Slide direction="down" in={!queryId} mountOnEnter unmountOnExit>
                <div>
                  <HeaderCarousel sendMovieIdToParent={handleMovieIdFromChildren} />
                </div>
              </Slide>
            </Grid>
          )}
        </Grid>
      </HideOnScroll>

      {queryId && (
        <Grid container justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
          <Slide direction="right" in={!!queryId} mountOnEnter unmountOnExit>
            <div>
              <BioDetail id={queryId} sendMovieIdToParent={handleMovieIdFromChildren} />
            </div>
          </Slide>
        </Grid>
      )}

      {!queryId && (
        <Slide direction="up" in={!queryId} mountOnEnter unmountOnExit>
          <div>
            <React.Suspense fallback={<div>Loading...</div>}>
              <BodyList sendMovieIdToParent={handleMovieIdFromChildren} />
            </React.Suspense>
          </div>
        </Slide>
      )}

      <AppFooter />
    </>
  );
}
