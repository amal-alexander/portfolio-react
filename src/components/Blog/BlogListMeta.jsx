import React from 'react';
import { Helmet } from 'react-helmet-async';

const BlogListMeta = () => {
  return (
    <Helmet>
      <title>Blog Posts | My Blog</title>
      <meta name="description" content="Explore our collection of articles on web development, career growth, and technology insights." />
      
      {/* Open Graph tags */}
      <meta property="og:title" content="Blog Posts | My Blog" />
      <meta property="og:description" content="Explore our collection of articles on web development, career growth, and technology insights." />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Blog Posts | My Blog" />
      <meta name="twitter:description" content="Explore our collection of articles on web development, career growth, and technology insights." />
      
      {/* Schema.org markup for blog listing */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "My Blog",
          "description": "Explore our collection of articles on web development, career growth, and technology insights.",
          "publisher": {
            "@type": "Organization",
            "name": "My Blog",
            "logo": {
              "@type": "ImageObject",
              "url": "/images/logo.png"
            }
          }
        })}
      </script>
    </Helmet>
  );
};

export default BlogListMeta;