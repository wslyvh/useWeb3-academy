// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
/* const { withSentryConfig } = require('@sentry/nextjs') */

const fs = require("fs")
const withPWA = require("next-pwa")

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
    dest: "public",
    disable: process.env.NODE_ENV === "development"
})({
    eslint: {
        ignoreDuringBuilds: true
    },
    reactStrictMode: true,
    swcMinify: true,
    env: {
        ETHEREUM_URL: process.env.ETHEREUM_URL,
        ETHEREUM_PRIVATE_KEY: process.env.ETHEREUM_PRIVATE_KEY,
        CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS
    },
    publicRuntimeConfig: {
        GROUP_ID: process.env.GROUP_ID
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false
            }
        }

        return config
    }
})

module.exports = nextConfig

/* module.exports = withSentryConfig(module.exports, { silent: true }, { hideSourcemaps: true }) */
