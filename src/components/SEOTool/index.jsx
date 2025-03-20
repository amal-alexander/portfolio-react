import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import SectionContainer from '../common/SectionContainer';
import SEOChart from './SEOChart';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 80px 0;
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1100px;
    gap: 12px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

const Title = styled(motion.div)`
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

const Desc = styled(motion.div)`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;

const SEOForm = styled(motion.form)`
    width: 95%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.card};
    padding: 32px;
    border-radius: 16px;
    box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
    margin-top: 28px;
    gap: 12px;
    @media (max-width: 768px) {
        padding: 20px;
        margin-top: 20px;
    }
`;

const SEOInput = styled(motion.input)`
    flex: 1;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.text_secondary};
    outline: none;
    font-size: 18px;
    color: ${({ theme }) => theme.text_primary};
    border-radius: 12px;
    padding: 12px 16px;
    &:focus {
        border: 1px solid ${({ theme }) => theme.primary};
    }
    @media (max-width: 768px) {
        font-size: 16px;
        padding: 10px 14px;
    }
`;

const SEOButton = styled(motion.button)`
    width: 100%;
    text-align: center;
    padding: 13px 16px;
    border-radius: 12px;
    border: none;
    color: ${({ theme }) => theme.text_primary};
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
    &:hover {
        transform: scale(1.05);
        transition: all 0.4s ease-in-out;
    }
    @media (max-width: 768px) {
        font-size: 16px;
        padding: 10px 14px;
    }
`;

const ResultBox = styled(motion.div)`
    background: ${({ theme }) => theme.card};
    border-radius: 16px;
    padding: 20px;
    box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
    margin-top: 20px;
    width: 95%;
    max-width: 600px;
    font-family: 'Poppins', sans-serif;
    color: ${({ theme }) => theme.text_primary};
    @media (max-width: 768px) {
        padding: 16px;
        margin-top: 16px;
    }
`;

const ResultTitle = styled.h3`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.primary};
`;

const ResultText = styled.p`
    font-size: 16px;
    margin: 8px 0;
    color: ${({ theme }) => theme.text_primary};
`;

const SEOTool = () => {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const form = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!url) {
            setErrorMessage('URL is required.');
            setOpen(true);
            return;
        }

        setLoading(true);

        try {
            console.log('Attempting to connect to backend at http://localhost:5000/audit');
            const response = await fetch('http://localhost:5000/audit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response not OK:', response.status, errorText);
                throw new Error(`Failed to analyze the URL (Status: ${response.status}). Please try again.`);
            }

            const data = await response.json();
            console.log('Received data from backend:', data);
            setResult(data);
        } catch (error) {
            console.error('Error in SEO Tool fetch:', error);
            setErrorMessage(error.message || 'Something went wrong. Please check the URL or try again.');
            setOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const prepareChartData = () => {
        if (result) {
            return {
                labels: ['Internal Links', 'External Links', 'Word Count', 'Image Count'],
                values: [
                    result.internalLinksCount || 0,
                    result.externalLinksCount || 0,
                    result.wordCount || 0,
                    result.imgCount || 0,
                ],
            };
        }
        return { labels: [], values: [] }; // Fallback if result is null
    };

    const chartData = prepareChartData();

    return (
        <SectionContainer>
            <Container id="seo-tool">
                <Wrapper>
                    <Title
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        SEO Tool
                    </Title>
                    <Desc
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Enter a URL to analyze its SEO performance and get the results!
                    </Desc>

                    <SEOForm
                        ref={form}
                        onSubmit={handleSubmit}
                        initial="hidden"
                        animate="visible"
                    >
                        <SEOFormTitle>Enter Website URL</SEOFormTitle>
                        <SEOInput
                            type="url"
                            placeholder="Enter website URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                        <SEOButton
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Analyzing...' : 'Start SEO Audit'}
                        </SEOButton>
                    </SEOForm>

                    {result && (
                        <ResultBox>
                            <ResultTitle>SEO Results</ResultTitle>
                            <ResultText><strong>Title:</strong> {result.title || 'N/A'}</ResultText>
                            <ResultText><strong>Description:</strong> {result.description || 'N/A'}</ResultText>
                            <ResultText><strong>H1:</strong> {result.h1 || 'N/A'}</ResultText>
                            <ResultText><strong>Canonical:</strong> {result.canonical || 'N/A'}</ResultText>
                            <ResultText><strong>Response Status:</strong> {result.responseStatus}</ResultText>
                            <ResultText><strong>Word Count:</strong> {result.wordCount}</ResultText>
                            <ResultText><strong>Image Count:</strong> {result.imgCount}</ResultText>
                            <ResultText><strong>Internal Links Count:</strong> {result.internalLinksCount}</ResultText>
                            <ResultText><strong>External Links Count:</strong> {result.externalLinksCount}</ResultText>

                            {/* Pass prepared chart data to SEOChart */}
                            <SEOChart data={chartData} />
                        </ResultBox>
                    )}

                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={() => setOpen(false)}
                        message={errorMessage}
                        severity="error"
                    />
                </Wrapper>
            </Container>
        </SectionContainer>
    );
};

export default SEOTool;