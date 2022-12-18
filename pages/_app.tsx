import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box } from '@components/box/Box';
import { theme } from 'stitches.config';
import Header from '@components/header/Header';
import { useRouter } from 'next/router';
import useAuth from '@hooks/useAuth';
import { useEffect } from 'react';
import { api } from 'src/api';
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) {
      localStorage.setItem('lastUnauthorizedPath', window.location.pathname);
      router.push(`/auth/login`);
      return;
    }
    // set access token in header
    api.defaults.headers.common['Authorization'] = accessToken;
  }, [router, accessToken]);

  return (
    <QueryClientProvider client={queryClient}>
      <Box
        css={{
          minHeight: '100vh',
          color: theme.colors.white,
          mx: '$auto',
          marginTop: '100px',
          '@desktop': {
            maxWidth: '1260px',
            px: '$30',
          },
          '@tablet': {
            px: '$20',
          },
          '@mobile': {
            marginTop: '70px',
          },
        }}
      >
        <Header />
        <Component {...pageProps} />
      </Box>
    </QueryClientProvider>
  );
}

export default MyApp;
