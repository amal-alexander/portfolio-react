import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text_primary};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 10px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
  }
`;

const Title = styled.h1`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  margin: 20px 0;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;



const Button = styled.button`
  padding: 12px 24px;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ResultContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 30px;
  padding: 20px;
  background: ${({ theme }) => theme.card};
  border-radius: 10px;
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.text_secondary};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const ResultItem = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: ${({ theme }) => theme.text_primary};
`;

const Label = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
`;

const CommonWordsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const WordChip = styled.span`
  padding: 4px 8px;
  background: ${({ theme }) => theme.accent};
  color: white;
  border-radius: 15px;
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  text-align: center;
  padding: 20px;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 10px;
  margin: 20px 0;
`;

const ContentSimilarity = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchWithRetry = async (url, options, attempt = 1) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }
      return response;
    } catch (error) {
      if (attempt < MAX_RETRIES && error.message.includes('Network error')) {
        setError(`Connection attempt ${attempt} failed. Retrying...`);
        const backoffTime = Math.min(1000 * Math.pow(2, attempt - 1), 8000);
        await sleep(backoffTime);
        return fetchWithRetry(url, options, attempt + 1);
      }
      throw new Error(
        attempt === MAX_RETRIES
          ? 'Connection failed after multiple attempts. Please check your network connection and try again.'
          : error.message
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setRetryCount(0);

    if (!text1.trim() || !text2.trim()) {
      setError('Please enter both texts to compare');
      setLoading(false);
      return;
    }

    try {
      const response = await fetchWithRetry(
        'http://localhost:5000/similarity/check',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text1, text2 }),
          timeout: 10000,
        }
      );

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container id="content-similarity">
      <Title>Content Similarity Checker</Title>
      <Description>
        Compare and analyze the similarity between different pieces of content.
        This tool helps you ensure content uniqueness and identify potential duplicates.
      </Description>

      <Form onSubmit={handleSubmit}>
        <TextArea
          placeholder="Enter the first text..."
          value={text1}
          onChange={(e) => setText1(e.target.value)}
          required
        />
        <TextArea
          placeholder="Enter the second text..."
          value={text2}
          onChange={(e) => setText2(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Compare Texts'}
        </Button>
      </Form>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {result && (
        <ResultContainer>
          <ResultItem>
            <Label>Similarity Score:</Label>
            <span>{(result.similarity_score * 100).toFixed(2)}%</span>
          </ResultItem>
          <ResultItem>
            <Label>Analysis:</Label>
            <div>Text 1 Word Count: {result.analysis.text1_word_count}</div>
            <div>Text 2 Word Count: {result.analysis.text2_word_count}</div>
            <div>Common Words: {result.analysis.common_words_count}</div>
          </ResultItem>
          <ResultItem>
            <Label>Common Words:</Label>
            <CommonWordsList>
              {result.analysis.common_words.map((word, index) => (
                <WordChip key={index}>{word}</WordChip>
              ))}
            </CommonWordsList>
          </ResultItem>
        </ResultContainer>
      )}
    </Container>
  );
};

export default ContentSimilarity;