import blogPosts from '../data/blogPosts';

const generateSitemap = () => {
  const baseUrl = 'https://amal-alexander.online';
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    {
      url: '/',
      lastmod: today,
      changefreq: 'monthly',
      priority: 1.0
    },
    {
      url: '/blog',
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8
    }
  ];

  // Generate URLs for each blog post
  const blogUrls = blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    lastmod: post.updated_at || today,
    changefreq: 'monthly',
    priority: 0.7
  }));

  const allUrls = [...staticPages, ...blogUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map(page => `
    <url>
      <loc>${baseUrl}${page.url}</loc>
      <lastmod>${page.lastmod}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>`).join('')}
</urlset>`;

  return sitemap;
};

export default generateSitemap;