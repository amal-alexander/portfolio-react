// Import required packages
require('dotenv').config(); // This loads environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio'); // For parsing HTML

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the SEO Audit API! Use POST /audit to analyze a URL.');
});

// Function to perform SEO audit analysis
const performSEOAnalysis = async (url) => {
  try {
    // Validate URL format
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(url)) {
      throw new Error('Invalid URL format. Please provide a valid URL.');
    }

    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html); // Load HTML with Cheerio for parsing

    // Extract title, description, H1, canonical, etc.
    const title = $('title').text() || 'No Title Found';
    const description = $('meta[name="description"]').attr('content') || 'No Description Found';
    const h1 = $('h1').first().text() || 'No H1 Found';
    const canonical = $('link[rel="canonical"]').attr('href') || 'No Canonical Found';
    const responseStatus = response.status; // HTTP response status

    // Count words
    const text = $('body').text();
    const wordCount = text.split(/\s+/).length;

    // Count images
    const imgCount = $('img').length;

    // Count internal and external links
    const internalLinks = [];
    const externalLinks = [];

    $('a').each(function () {
      const href = $(this).attr('href');
      if (href && href.startsWith(url)) {
        internalLinks.push(href);
      } else {
        externalLinks.push(href);
      }
    });

    return {
      url,
      title,
      description,
      h1,
      canonical,
      responseStatus,
      wordCount,
      imgCount,
      internalLinksCount: internalLinks.length,
      externalLinksCount: externalLinks.length,
      internalLinks,
      externalLinks,
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw new Error(`Failed to fetch data from the provided URL: ${error.message}`);
  }
};

// API route for auditing a URL
app.post('/audit', async (req, res) => {
  const { url } = req.body;

  // Validate the request body
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
  console.log(`Server is running at http://localhost:${PORT}`);
});