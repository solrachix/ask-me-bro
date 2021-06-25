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
    rewrites() {
      return [
        {
          source: '/rooms/:id',
          destination: '/rooms/room'
        },
        {
          source: '/admin/rooms/:id',
          destination: '/rooms/admin'
        },
      ]
    }
  },
  [withPWA, {
    pwa: {
      disable: process.env.NODE_ENV === 'development',
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

