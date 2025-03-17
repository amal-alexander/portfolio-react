export const fetchSEONews = async () => {
    const API_KEY = '525e4da76446475a8c6d13b748da0768';
    const query = 'SEO OR "Search Engine Optimization" OR Google Algorithm';
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === 'ok') {
        return data.articles.map(article => ({
          title: article.title,
          description: article.description,
          date: new Date(article.publishedAt).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
          }),
          category: extractSource(article.source.name),
          link: article.url,
        }));
      } else {
        console.error('NewsAPI error:', data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  };
  
  const extractSource = (sourceName) => {
    if (sourceName.toLowerCase().includes('google')) return 'Google';
    if (sourceName.toLowerCase().includes('bing')) return 'Bing';
    if (sourceName.toLowerCase().includes('yahoo')) return 'Yahoo';
    return 'General';
  };
  