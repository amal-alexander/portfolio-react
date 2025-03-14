// BlogList.jsx
import { useEffect, useState } from 'react';
import { getPosts } from '../api'; // your API file
import { useNavigate } from 'react-router-dom';
import './BlogList.css'; // optional animation styles

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <div className="blog-list">
      {posts.slice(0, 3).map((post) => (
        <div
          key={post._id}
          className="blog-tile animated"
          onClick={() => navigate(`/posts/${post._id}`)}
        >
          <h3>{post.title}</h3>
          <p>{post.content.slice(0, 100)}...</p>
          <span>By {post.author}</span>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
