import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import SectionContainer from '../common/SectionContainer';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 80px 0px;
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
`;

const SEOFormTitle = styled(motion.div)`
    font-size: 24px;
    margin-bottom: 6px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
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
`;

const SEOButton = styled(motion.input)`
    width: 100%;
    text-decoration: none;
    text-align: center;
    background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
    padding: 13px 16px;
    margin-top: 2px;
    border-radius: 12px;
    border: none;
    color: ${({ theme }) => theme.text_primary};
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
        transition: all 0.4s ease-in-out;
    }
`;

const ResultBox = styled(motion.div)`
    width: 100%;
    max-width: 600px;
    background-color: ${({ theme }) => theme.card};
    padding: 20px;
    margin-top: 28px;
    border-radius: 12px;
    box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
    color: ${({ theme }) => theme.text_primary};
    text-align: center;
`;

const SEO = () => {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const form = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!url) {
            setOpen(true);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/crawl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error(error);
            setOpen(true);
        }

        setLoading(false);
    };

    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    const inputVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

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

                    <SEOForm ref={form} onSubmit={handleSubmit} variants={formVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <SEOFormTitle variants={inputVariants}>Enter Website URL</SEOFormTitle>
                        <SEOInput
                            type="url"
                            placeholder="Enter website URL"
                            name="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                            variants={inputVariants}
                        />
                        <SEOButton
                            type="submit"
                            value={loading ? 'Analyzing...' : 'Start SEO Audit'}
                            disabled={loading}
                        />
                    </SEOForm>

                    {result && (
                        <ResultBox variants={formVariants}>
                            <h3>SEO Results</h3>
                            <p><strong>Title:</strong> {result.title || 'N/A'}</p>
                            <p><strong>Description:</strong> {result.description || 'N/A'}</p>
                            <p><strong>URL:</strong> {result.url}</p>
                        </ResultBox>
                    )}

                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={() => setOpen(false)}
                        message="Something went wrong! Please check the URL or try again."
                        severity="error"
                    />
                </Wrapper>
            </Container>
        </SectionContainer>
    );
};

export default SEO;