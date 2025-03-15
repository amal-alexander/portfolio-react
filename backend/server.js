// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
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
  res.send('✅ Welcome to the SEO Audit API! Use POST /audit to analyze a URL.');
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

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
