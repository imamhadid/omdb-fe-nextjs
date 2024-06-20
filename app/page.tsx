'use client';
import * as React from 'react';
import {
  Box,
  Grid,
  Slide,
  useScrollTrigger,
} from '@mui/material';

// Components
import HeaderCarousel from '@/components/header';
import BodyList from '@/components/Body';
import AppFooter from '@/components/Footer';
import AppBars from '@/components/AppBar';
import BioDetail from '@/components/BioDetail';

import { useSearchParams } from 'next/navigation';

function HideOnScroll(props: any) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
export default function Home() {
  const [queryId, setQueryId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    setQueryId(id);
  }, []);

  return (
    <>
      <Grid container spacing={2} style={{ position: 'relative' }}>
        <Grid item xs={12}>
          <Box sx={{ zIndex: 10 }}>
            <AppBars />
          </Box>
        </Grid>
        {!queryId && (
          <Grid item xs={12} sx={{ backgroundColor: `white` }}>
            <Slide direction="down" in={!queryId} mountOnEnter unmountOnExit>
              <div>
                <HeaderCarousel />
              </div>
            </Slide>
          </Grid>
        )}
      </Grid>

      {queryId && (
        <Grid container justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
          <Slide direction="right" in={!!queryId} mountOnEnter unmountOnExit>
            <div>
              <BioDetail id={queryId} />
            </div>
          </Slide>
        </Grid>
      )}

      {!queryId && (
        <Slide direction="up" in={!queryId} mountOnEnter unmountOnExit>
          <div>
            <React.Suspense fallback={<div>Loading...</div>}>
              <BodyList />
            </React.Suspense>
          </div>
        </Slide>
      )}

      <AppFooter />
    </>
  );
}
