const fetchArticles = async () => {
  setLoading(true);
  try {
    const response = await fetch('http://localhost:5000/api/news'); // Call your backend
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${await response.text()}`);
    }

    const data = await response.json();
    setArticles(data.articles || []);
  } catch (err) {
    console.error('Error fetching articles:', err);
    setError('Failed to fetch articles. Please try again later.');
  } finally {
    setLoading(false);
  }
};
