import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ✅ Function to fetch all posts
export const getPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// ✅ Function to fetch a single post by ID
export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

// ✅ Function to fetch SEO news
export const fetchArticles = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/news`);
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
