import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Snackbar } from "@mui/material";
import { motion } from "framer-motion";
import SectionContainer from "../common/SectionContainer";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    color: ${({ theme }) => theme.text_primary};
    @media (max-width: 768px) {
        font-size: 32px;
    }
`;

const Desc = styled(motion.div)`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
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

const TopicCluster = () => {
    const [keyword, setKeyword] = useState("");
    const [clusters, setClusters] = useState(null);
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchClusters = async () => {
        if (!keyword) return;
        try {
            const { data } = await axios.get(
                `http://localhost:5000/api/cluster?keyword=${keyword}`
            );
            setClusters(data.clusters);
        } catch (error) {
            console.error("Error fetching clusters", error);
            setErrorMessage("Error fetching clusters. Please try again.");
            setOpen(true);
        }
    };

    return (
        <SectionContainer>
            <Container id="topic-cluster">
                <Wrapper>
                    <Title
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        SEO Topic Clusters
                    </Title>
                    <Desc
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Enter a keyword to generate relevant topic clusters.
                    </Desc>

                    <SEOForm onSubmit={(e) => e.preventDefault()}>
                        <SEOInput
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Enter keyword..."
                        />
                        <SEOButton type="button" onClick={fetchClusters}>
                            Generate Clusters
                        </SEOButton>
                    </SEOForm>

                    {clusters && (
                        <ResultBox
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <ResultTitle>Topic Clusters for "{keyword}"</ResultTitle>
                            <ul>
                                {Object.entries(clusters).map(([key, titles]) => (
                                    <li key={key}>
                                        <strong>{key}</strong>
                                        <ul>
                                            {titles.map((title, index) => (
                                                <li key={index}>{title}</li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
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

export default TopicCluster;
