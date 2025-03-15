import React, { useState } from 'react';
import styled from 'styled-components';
import BlogCard from './BlogCard';
import BlogPostDetails from './BlogPostDetails';

const BlogGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    padding: 20px;
`;

const PostList = ({ posts }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {posts.map((post) => (
                <BlogCard key={post.id} post={post} onClick={() => console.log(`Opening post: ${post.title}`)} />
            ))}
        </div>
    );
};

export default PostList;