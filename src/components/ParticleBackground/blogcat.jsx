import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function CategoryPage() {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts by category
    fetch(`http://127.0.0.1:5000/api/posts/category/${category}`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error:', error));
  }, [category]);

  return (
    <div>
      <h1>Category: {category}</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.title}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Posted on: {post.date_posted}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No posts found in this category.</p>
      )}
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default CategoryPage;