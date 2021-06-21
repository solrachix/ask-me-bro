const withPlugins = require('next-compose-plugins')
const withSvgr = require('next-svgr')
const withPWA = require('next-pwa')
const withSourceMaps = require('@zeit/next-source-maps')


module.exports = withPlugins([
  {
    distDir: 'build',

    productionBrowserSourceMaps: true,
    future: { webpack5: true },
    typescript: {
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    env: {
      SERVER_URL: 'https://solrachix-portfolio-server.herokuapp.com', // http://localhost:3333
      NEXT_PUBLIC_SITE_URL: 'solrachix.vercel.app'
    }
  },
  [withPWA, {
    pwa: {
      // disable: process.env.NODE_ENV === 'development',
      dest: 'public',
      register: true,
      sw: '/sw.js'
    }
  }],
  [withSourceMaps, {
    webpack(config, options) {
      return config
    }
  }],
  withSvgr
])

