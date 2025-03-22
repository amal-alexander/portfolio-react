const express = require('express');
const router = express.Router();
const natural = require('natural');
const TfIdf = natural.TfIdf;

// Function to preprocess text
function preprocessText(text) {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text.toLowerCase());
  const stopwords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with']);
  return tokens.filter(token => !stopwords.has(token) && token.length > 2);
}

// Function to calculate cosine similarity
function calculateCosineSimilarity(vec1, vec2) {
  const dotProduct = Object.keys(vec1).reduce((sum, key) => {
    return sum + (vec1[key] * (vec2[key] || 0));
  }, 0);

  const magnitude1 = Math.sqrt(Object.values(vec1).reduce((sum, val) => sum + val * val, 0));
  const magnitude2 = Math.sqrt(Object.values(vec2).reduce((sum, val) => sum + val * val, 0));

  if (magnitude1 === 0 || magnitude2 === 0) return 0;
  return dotProduct / (magnitude1 * magnitude2);
}

// POST endpoint for content similarity check
router.post('/check', (req, res) => {
  try {
    const { text1, text2 } = req.body;

    if (!text1 || !text2) {
      return res.status(400).json({ error: 'Both text inputs are required' });
    }

    // Preprocess texts
    const processedText1 = preprocessText(text1);
    const processedText2 = preprocessText(text2);

    // Create TF-IDF vectors
    const tfidf = new TfIdf();
    tfidf.addDocument(processedText1);
    tfidf.addDocument(processedText2);

    // Get term vectors
    const vector1 = {};
    const vector2 = {};

    // Create term frequency vectors
    tfidf.listTerms(0).forEach(item => {
      vector1[item.term] = item.tfidf;
    });

    tfidf.listTerms(1).forEach(item => {
      vector2[item.term] = item.tfidf;
    });

    // Calculate similarity score
    const similarityScore = calculateCosineSimilarity(vector1, vector2);

    // Additional analysis
    const uniqueWords1 = new Set(processedText1);
    const uniqueWords2 = new Set(processedText2);
    const commonWords = new Set([...uniqueWords1].filter(x => uniqueWords2.has(x)));

    res.json({
      similarity_score: similarityScore,
      analysis: {
        text1_word_count: processedText1.length,
        text2_word_count: processedText2.length,
        common_words_count: commonWords.size,
        common_words: Array.from(commonWords),
      }
    });

  } catch (error) {
    console.error('Error in similarity check:', error);
    res.status(500).json({ error: 'Failed to process similarity check' });
  }
});

module.exports = router;