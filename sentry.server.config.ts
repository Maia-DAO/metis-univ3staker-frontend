import * as Sentry from '@sentry/nextjs'

Sentry.init({
	dsn: 'https://62d55f63cd4da14c38b9931da01119a5@o4505850986102784.ingest.sentry.io/4505850988593152',
	tracesSampleRate: 1,
})
