// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const puppeteer = require('puppeteer');
const natural = require('natural');
require('dotenv').config(); // Load environment variables

const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/blog';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((error) => {
  console.error('❌ MongoDB connection error:', error);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mount the posts router
app.use('/posts', postsRouter);

// Root route
app.get('/', (req, res) => {
  res.send('✅ Welcome to the SEO Audit and Clustering API! Use POST /audit to analyze a URL or GET /api/cluster to get topic clusters.');
});

// Function to perform SEO audit analysis
const performSEOAnalysis = async (url) => {
  try {
    // Improved URL validation
    const urlPattern = /^(https?:\/\/)([\w.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/i;
    if (!urlPattern.test(url)) {
      throw new Error('Invalid URL format. Please provide a valid URL with http or https.');
    }

    // Fetch page data
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract SEO-related information
    const title = $('title').text().trim() || 'No Title Found';
    const description = $('meta[name="description"]').attr('content')?.trim() || 'No Description Found';
    const h1 = $('h1').first().text().trim() || 'No H1 Found';
    const canonical = $('link[rel="canonical"]').attr('href')?.trim() || 'No Canonical Found';
    const responseStatus = response.status;

    // Calculate text and word count
    const text = $('body').text().replace(/\s+/g, ' ').trim();
    const wordCount = text.split(/\s+/).length;
    const imgCount = $('img').length;

    // Extract internal and external links
    const internalLinks = [];
    const externalLinks = [];

    $('a').each(function () {
      const href = $(this).attr('href');
      if (href) {
        const absoluteUrl = new URL(href, url).href;
        if (absoluteUrl.startsWith(url)) {
          internalLinks.push(absoluteUrl);
        } else {
          externalLinks.push(absoluteUrl);
        }
      }
    });

    return {
      url,
      responseStatus,
      title,
      description,
      h1,
      canonical,
      wordCount,
      imgCount,
      internalLinksCount: internalLinks.length,
      externalLinksCount: externalLinks.length,
      internalLinks,
      externalLinks,
    };
  } catch (error) {
    console.error('❌ Error fetching data:', error.message);
    throw new Error(`Failed to fetch data from the provided URL: ${error.message}`);
  }
};

// API route for auditing a URL
app.post('/audit', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required.' });
  }

  try {
    const auditResult = await performSEOAnalysis(url);
    res.json(auditResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Function to scrape Google SERPs
async function scrapeGoogleSERP(query) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://www.google.com/search?q=${query}`);
  const results = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("h3")).map(h => h.innerText);
  });
  await browser.close();
  return results;
}

// NLP-based clustering
function generateTopicClusters(serpResults) {
  const tokenizer = new natural.WordTokenizer();
  const clusters = {};

  serpResults.forEach(title => {
    const tokens = tokenizer.tokenize(title.toLowerCase());
    tokens.forEach(word => {
      if (!clusters[word]) clusters[word] = [];
      clusters[word].push(title);
    });
  });

  return clusters;
}

// API route for getting topic clusters based on keyword
app.get("/api/cluster", async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) return res.status(400).json({ error: "Keyword is required" });

  try {
    const serpResults = await scrapeGoogleSERP(keyword);
    const clusters = generateTopicClusters(serpResults);
    res.json({ keyword, clusters });
  } catch (error) {
    res.status(500).json({ error: "Error generating clusters" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
