import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 50px 0px;
`;

const ParticleContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1100px;
    gap: 24px;
`;

const Title = styled(motion.div)`
    font-size: 42px;
    text-align: center;
    font-weight: 600;
    margin-top: 20px;
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

const StatsImage = styled(motion.img)`
    max-width: 100%;
    border-radius: 12px;
        box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
`;

function GithubStats() {
    return (
        <Container id="github">

            <Wrapper>
                <Title
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    GitHub Stats
                </Title>
                <Desc
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    These are my real-time GitHub statistics fetched from GitHub Readme Stats.
                </Desc>

                {/* GitHub Stats Card */}
                <StatsImage
                    src="https://camo.githubusercontent.com/82bce4a89090d3f80dfa42ea4085827359c701dd004eb4a2533a7b22014ddbe1/68747470733a2f2f6769746875622d726561646d652d73746174732e76657263656c2e6170702f6170693f757365726e616d653d616d616c2d616c6578616e646572267468656d653d6461726b26686964655f626f726465723d7472756526696e636c7564655f616c6c5f636f6d6d6974733d7472756526636f756e745f707269766174653d74727565https://github-readme-stats.vercel.app/api?username=amal-alexander&amp;theme=dark&amp;hide_border=true&amp;include_all_commits=true&amp;count_private=true"
                    alt="GitHub Stats"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }} />

                {/* Top Languages Card */}
                <StatsImage
                    src="https://github-readme-stats.vercel.app/api/top-langs/?username=amal-alexander&layout=compact&theme=dark&hide_border=true"
                    alt="Top Languages"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }} />

                {/* GitHub Contribution Graph */}
                <StatsImage
                    src="https://github-contributor-stats.vercel.app/api?username=amal-alexander&limit=5&theme=dark&combine_all_yearly_contributions=true"
                    alt="Contribution Stats"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }} />
            </Wrapper>
        </Container>
    );
}

export default GithubStats;
