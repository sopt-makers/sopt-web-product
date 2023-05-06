import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.APP_ENV === 'production' ? 'production' : 'development',
  tracesSampleRate: 1.0,
});
