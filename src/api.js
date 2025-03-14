import axios from 'axios';

const API_URL = 'http://localhost:5000/posts'; // Update this if needed

// Function to get all posts
export const getPosts = async () => {
    const { data } = await axios.get(API_URL);
    return data;
};

// Function to create a new post
export const createPost = async (newPost) => {
    const { data } = await axios.post(API_URL, newPost);
    return data;
};

// Function to update an existing post
export const updatePost = async (id, updatedData) => {
    const { data } = await axios.put(`${API_URL}/${id}`, updatedData);
    return data;
};

// Function to delete a post
export const deletePost = async (id) => {
    const { data } = await axios.delete(`${API_URL}/${id}`);
    return data;
};