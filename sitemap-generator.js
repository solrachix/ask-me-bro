const { configureSitemap } = require('@sergeymyssak/nextjs-sitemap');

const Sitemap = configureSitemap({
  baseUrl: 'https://ask-me-bro.vercel.app',
  excludeIndex: true,
  pagesConfig: {
    '/': {
      priority: '1',
    },
    '/about': {
      priority: '1',
    },
    '/proposal': {
      priority: '0.5',
    },
    '/projects/*': {
      priority: '0.5',
      changefreq: 'daily',
    },
  },
  isTrailingSlashRequired: true,
  // nextConfigPath: __dirname + '/next.config.js',
  targetDirectory: __dirname + '/public',
  pagesDirectory: __dirname + '/src/pages',
});

Sitemap.generateSitemap();
