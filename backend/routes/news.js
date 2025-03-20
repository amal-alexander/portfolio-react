app.get("/api/news", async (req, res) => {
    try {
        const apiKey = process.env.NEWS_API_KEY;
        console.log("Fetching news with API key:", apiKey); // Add this log to ensure the key is loaded

        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: 'SEO', // Default query
                apiKey: apiKey,
                pageSize: 10, // Number of articles to fetch
            },
        });

        console.log("News API response:", response.data); // Log the response data

        if (response.data.articles.length === 0) {
            return res.status(404).json({ error: 'No articles found' });
        }

        const articles = response.data.articles.map((article) => ({
            title: article.title,
            description: article.description,
            url: article.url,
            image: article.urlToImage,
            publishedAt: article.publishedAt,
        }));

        res.json({ articles });
    } catch (error) {
        console.error('Error fetching news:', error.message);
        if (error.response?.status === 401) {
            res.status(401).json({ error: 'Invalid API key' });
        } else if (error.response?.status === 429) {
            res.status(429).json({ error: 'Rate limit exceeded' });
        } else {
            res.status(500).json({ error: 'Failed to fetch news articles' });
        }
    }
});
