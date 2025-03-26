import React from 'react';
import { Helmet } from 'react-helmet';

const BlogMeta = ({ post }) => {
  if (!post) return null;

  const { title, content, category, author } = post;
  const description = content.substring(0, 160); // Get first 160 characters for meta description

  return (
    <Helmet>
      <title>{title} | My Blog</title>
      <meta name="description" content={description} />
      
      {/* Open Graph tags for social sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      {post.coverImage && <meta property="og:image" content={post.coverImage} />}
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {post.coverImage && <meta name="twitter:image" content={post.coverImage} />}
      
      {/* Article specific meta tags */}
      <meta property="article:published_time" content={post.created_at} />
      <meta property="article:author" content={author} />
      <meta property="article:section" content={category} />
      
      {/* Schema.org markup for articles */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": title,
          "description": description,
          "author": {
            "@type": "Person",
            "name": author
          },
          "datePublished": post.created_at,
          "image": post.coverImage,
          "articleSection": category,
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

export default BlogMeta;