import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ParticleBackground from '../ParticleBackground/ParticleBackground'; // Import particle background if needed

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
        font-size: 16px;
    }
`;

const StatsContainer = styled(motion.div)`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    gap: 30px;
    justify-content: center;
`;

const Stat = styled(motion.div)`
    width: 100%;
    max-width: 500px;
    background: ${({ theme }) => theme.card};
    border: 0.1px solid #854CE6;
    box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
    border-radius: 16px;
    padding: 18px 36px;
    @media (max-width: 768px) {
        max-width: 400px;
        padding: 10px 36px;
    }
    @media (max-width: 500px) {
        max-width: 330px;
        padding: 10px 36px;
    }
`;

const StatTitle = styled.h2`
    font-size: 28px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_secondary};
    margin-bottom: 20px;
    text-align: center;
`;

const StatList = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 20px;
`;

const StatItem = styled(motion.div)`
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_primary + 80};
    border: 1px solid ${({ theme }) => theme.text_primary + 80};
    border-radius: 12px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px 12px;
    }
    @media (max-width: 500px) {
        font-size: 14px;
        padding: 6px 12px;
    }
`;

const StatImage = styled.img`
    width: 24px;
    height: 24px;
`;

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

const GithubStats = () => {
    // Example GitHub stats data
    const githubStats = [
        {
            title: "Repositories",
            stats: [
                { name: "Total Repos", value: "50" },
                { name: "Public Repos", value: "40" },
                { name: "Private Repos", value: "10" },
            ],
        },
        {
            title: "Activity",
            stats: [
                { name: "Commits (Last Year)", value: "500" },
                { name: "Pull Requests", value: "100" },
                { name: "Issues", value: "50" },
            ],
        },
    ];

    return (
        <Container id="github">
            <ParticleContainer>
                <ParticleBackground /> {/* Add particle background if needed */}
            </ParticleContainer>
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
                    Here are some of my GitHub statistics.
                </Desc>
                <StatsContainer
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {githubStats.map((stat, index) => (
                        <Stat
                            key={index}
                            variants={itemVariants}
                        >
                            <StatTitle>{stat.title}</StatTitle>
                            <StatList>
                                {stat.stats.map((item, index) => (
                                    <StatItem
                                        key={index}
                                        variants={itemVariants}
                                    >
                                        {item.name}: {item.value}
                                    </StatItem>
                                ))}
                            </StatList>
                        </Stat>
                    ))}
                </StatsContainer>
            </Wrapper>
        </Container>
    );
};

export default GithubStats;