import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.DSN,
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
  enableLogs: true,
});