/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://causw.co.kr',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/home/*', '/locker/*', '/board/*', '/setting/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: ['/authorization', '/findemail', '/findpassword', '/signin', '/signup'],
        disallow: ['/home', '/locker', '/board', '/setting'],
      },
    ],
  },
};
