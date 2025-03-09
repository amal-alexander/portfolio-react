import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ParticleBackground from "../ParticleBackground";// Ensure this component exists

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 80px 0px;
    background: linear-gradient(
        343.07deg,
        rgba(132, 59, 206, 0.06) 5.71%,
        rgba(132, 59, 206, 0) 64.83%
    );
`;

const ParticleContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    opacity: 0.5;
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
    width: 100%;
`;

const Title = styled(motion.h1)`
    font-size: 42px;
    color: ${({ theme }) => theme.text_primary || 'black'};
    margin-bottom: 20px;
    text-align: center;
`;

const StatsContainer = styled(motion.div)`
    width: 100%;
    max-width: 1100px;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    position: relative;
    z-index: 3;
`;

const StatCard = styled.div`
    background: white;
    border-radius: 16px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 24px;
    overflow: hidden;
    width: 100%;
    max-width: 350px; // Set a max width for the cards
`;

const GithubStats = () => {
    const username = "amal-alexander";

    return (
        <Container id="github">
            <ParticleContainer>
                <ParticleBackground />
            </ParticleContainer>
            <Wrapper>
                <Title
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    GitHub Stats
                </Title>
                <StatsContainer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <StatCard>
                        <img 
                            src={`https://github-readme-stats-git-masterrstaa-rickstaa.vercel.app/api?username=${username}&show_icons=true&theme=radical&hide_border=true&bg_color=0D1117&title_color=854CE6&icon_color=854CE6&text_color=FFFFFF`}
                            alt="GitHub Stats"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </StatCard>
                    <StatCard>
                        <img 
                            src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=radical&hide_border=true&background=0D1117&stroke=854CE6&ring=854CE6&fire=854CE6&currStreakLabel=854CE6&sideLabels=854CE6`}
                            alt="GitHub Streak Stats"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </StatCard>
                    <StatCard>
                        <img 
                            src={`https://github-readme-stats-git-masterrstaa-rickstaa.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=radical&hide_border=true&bg_color=0D1117&title_color=854CE6&text_color=FFFFFF`}
                            alt="Most Used Languages"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </StatCard>
                </StatsContainer>
            </Wrapper>
        </Container>
    );
};

export default GithubStats;     