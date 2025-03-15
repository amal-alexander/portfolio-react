import axios from "axios";

const API_URL = "http://localhost:5000/posts"; // Ensure this URL is correct

// Function to get all posts
export const getPosts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};

// Function to create a new post
export const createPost = async (newPost) => {
    try {
        const response = await axios.post(API_URL, newPost);
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error; // Throw error for better error handling in UI
    }
};

// Function to update an existing post
export const updatePost = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`Error updating post ${id}:`, error);
        throw error;
    }
};

// Function to delete a post
export const deletePost = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting post ${id}:`, error);
        throw error;
    }
};
