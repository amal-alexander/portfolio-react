// Import required packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const natural = require("natural");
const helmet = require("helmet"); // Security middleware
require("dotenv").config(); // Load environment variables

const postsRouter = require("./routes/posts");
const similarityRouter = require("./routes/similarity");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/blog";

// Enable CORS & Security Middleware
app.use(cors({
    origin: "*", // Allow frontend to access backend
  }));
app.use(helmet()); // Helps secure Express apps
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// Mount the routers
app.use("/posts", postsRouter);
app.use("/similarity", similarityRouter);

// Root route
app.get("/", (req, res) => {
  res.send("✅ Welcome to the SEO Audit, Clustering, and Blog API!");
});

// Function to perform SEO audit analysis
const performSEOAnalysis = async (url) => {
  try {
    const urlPattern = /^(https?:\/\/)([\w.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/i;
    if (!urlPattern.test(url)) throw new Error("Invalid URL format.");

    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    return {
      url,
      responseStatus: response.status,
      title: $("title").text().trim() || "No Title Found",
      description: $('meta[name="description"]').attr("content")?.trim() || "No Description Found",
      h1: $("h1").first().text().trim() || "No H1 Found",
      canonical: $('link[rel="canonical"]').attr("href")?.trim() || "No Canonical Found",
      wordCount: $("body").text().replace(/\s+/g, " ").trim().split(/\s+/).length,
      imgCount: $("img").length,
      internalLinksCount: $("a[href^='/']").length,
      externalLinksCount: $("a[href^='http']").length,
    };
  } catch (error) {
    console.error("❌ SEO Analysis Error:", error.message);
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
};

// API route for auditing a URL
app.post("/audit", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required." });

  try {
    const auditResult = await performSEOAnalysis(url);
    res.json(auditResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Function to scrape Google SERPs
async function scrapeGoogleSERP(query, retryCount = 3) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--window-size=1920,1080'
      ]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Set extra HTTP headers
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    });

    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (['image', 'stylesheet', 'font', 'media'].includes(request.resourceType()))
        request.abort();
      else
        request.continue();
    });

    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&hl=en`;
    const response = await page.goto(searchUrl, {
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 30000
    });

    if (!response.ok()) {
      throw new Error(`HTTP ${response.status()} on ${searchUrl}`);
    }

    // Wait for search results to load
    await page.waitForSelector('div.g', { timeout: 10000 });

    const results = await page.evaluate(() => {
      const titles = Array.from(document.querySelectorAll('div.g h3'));
      return titles.map(h3 => h3.textContent.trim())
        .filter(text => text && text.length > 0);
    });

    if (!results || results.length === 0) {
      if (retryCount > 0) {
        console.log(`Retrying search for "${query}". ${retryCount} attempts remaining...`);
        await browser.close();
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
        return scrapeGoogleSERP(query, retryCount - 1);
      }
      throw new Error('No search results found after multiple attempts');
    }

    return results;
  } catch (error) {
    console.error('Error scraping Google SERP:', error);
    throw new Error(`Failed to scrape search results: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// NLP-based clustering with improved tokenization
function generateTopicClusters(serpResults) {
  try {
    const tokenizer = new natural.WordTokenizer();
    const stopwords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
      'will', 'would', 'shall', 'should', 'may', 'might', 'must', 'can', 'could'
    ]);
    const clusters = {};
    const minWordLength = 3;
    const minClusterSize = 2;

    serpResults.forEach((title) => {
      if (!title || typeof title !== 'string') return;

      const tokens = tokenizer.tokenize(title.toLowerCase())
        .filter(word => {
          return (
            !stopwords.has(word) &&
            word.length >= minWordLength &&
            /^[a-zA-Z]+$/.test(word)
          );
        });

      tokens.forEach((word) => {
        if (!clusters[word]) clusters[word] = new Set();
        clusters[word].add(title);
      });
    });

    // Convert Sets to Arrays and filter out small clusters
    const filteredClusters = {};
    Object.entries(clusters).forEach(([word, titles]) => {
      if (titles.size >= minClusterSize) {
        filteredClusters[word] = Array.from(titles);
      }
    });

    return filteredClusters;
  } catch (error) {
    console.error('Error generating clusters:', error);
    throw new Error(`Failed to generate topic clusters: ${error.message}`);
  }
}

// API route for getting topic clusters
app.get("/api/cluster", async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) return res.status(400).json({ error: "Keyword is required" });

  try {
    console.log(`Fetching SERP results for keyword: ${keyword}`);
    const serpResults = await scrapeGoogleSERP(keyword);
    
    if (!serpResults || serpResults.length === 0) {
      return res.status(404).json({ error: "No search results found for the given keyword" });
    }

    console.log(`Generating clusters for ${serpResults.length} results`);
    const clusters = generateTopicClusters(serpResults);
    
    if (Object.keys(clusters).length === 0) {
      return res.status(404).json({ error: "No meaningful clusters could be generated" });
    }

    res.json({ keyword, clusters });
  } catch (error) {
    console.error('Cluster generation error:', error);
    const errorMessage = error.message || 'Unknown error occurred';
    res.status(500).json({ 
      error: "Error generating clusters",
      details: errorMessage,
      type: error.name || 'UnknownError'
    });
  }
});

// ✅ NEW: API route for fetching SEO-related news articles
app.get("/api/news", async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing API key. Check .env file." });

    console.log("Fetching news with API key:", apiKey);

    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: { q: "SEO", apiKey, pageSize: 10 },
    });

    if (!response.data || !response.data.articles) {
      console.error("Error: News API returned an invalid response.");
      return res.status(500).json({ error: "Invalid API response." });
    }

    const articles = response.data.articles.map((article) => ({
      title: article.title,
      description: article.description || "No description available",
      url: article.url,
      image: article.urlToImage || "https://via.placeholder.com/150",
      publishedAt: article.publishedAt || "Unknown",
    }));

    res.json({ articles });
  } catch (error) {
    console.error("Error fetching news:", error.message);
    const status = error.response?.status || 500;
    const message =
      status === 401 ? "Invalid API key" :
      status === 429 ? "Rate limit exceeded." :
      "Failed to fetch news articles";

    res.status(status).json({ error: message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
