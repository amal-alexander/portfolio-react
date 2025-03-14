# BlogDetail Component

import React from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail: React.FC = () => {
    const { title } = useParams<{ title: string }>();
    
    const blogPosts: Record<string, { content: string }> = {
        "my-first-blog": {
            content: "This is the content of my first blog post. Lorem ipsum...",
        },
        "my-second-blog": {
            content: "This is the content of my second blog post. Sed do eiusmod...",
        },
        "my-third-blog": {
            content: "This is the content of my third blog post. Ut enim ad...",
        }
    };

    const postContent = blogPosts[title] ? blogPosts[title].content : "Post not found!";

    return (
        <div>
            <h1>{title.replace(/-/g, ' ')}</h1>
            <p>{postContent}</p>
        </div>
    );
};

export default BlogDetail;
