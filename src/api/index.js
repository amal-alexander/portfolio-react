const API_URL = 'http://localhost:5000/api';

export const getPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPostByTitle = async (title) => {
  try {
    const response = await fetch(`${API_URL}/posts/${title}`);
    if (!response.ok) {
      throw new Error('Post not found');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createPost = async (postData) => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};