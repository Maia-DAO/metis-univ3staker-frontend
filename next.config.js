const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
	//reactStrictMode: true,
	experimental: {
		appDir: false,
	},
	sentry: {
		hideSourceMaps: true,
	},
}

const sentryWebpackPluginOptions = {
	org: 'maiadao-2152c5bc1',
	project: 'javascript-nextjs',
	authToken: process.env.SENTRY_AUTH_TOKEN,
}

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
