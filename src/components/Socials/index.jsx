import React from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import instagramAnim from '../../images/instagram.json';
import youtubeAnim from '../../images/yt.json';
import gmailAnim from '../../images/gmail.json';
import linkedinAnim from '../../images/linkedin.json';
import ParticleBackground from "../ParticleBackground/index.jsx";
import { Bio } from '../../data/constants';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 60px 0px;
    background: ${({ theme }) => theme.card_light};
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

const Title = styled.div`
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

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;

const SocialWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 32px;
    flex-wrap: wrap;
    margin-top: 40px;
    @media (max-width: 768px) {
        gap: 24px;
    }
`;

const SocialIcon = styled.a`
    width: 160px;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: ${({ theme }) => theme.card};
    padding: 20px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border: 3px solid transparent;
    box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 0 20px var(--hover-color);
        border-color: var(--hover-color);
        
        svg {
            fill: var(--hover-color);
        }
    }

    @media (max-width: 768px) {
        width: 120px;
        height: 120px;
        padding: 15px;
    }

    @media (max-width: 480px) {
        width: 100px;
        height: 100px;
        padding: 12px;
    }
`;

const IconInner = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: ${({ theme }) => theme.background};
    padding: 12px;
    transition: all 0.3s ease-in-out;
`;

const ParticleContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
`;

const YouTubeIcon = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FF0000;
    svg {
        width: 60%;
        height: 60%;
    }
`;

const Socials = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const socialLinks = [
        {
            name: 'LinkedIn',
            animation: linkedinAnim,
            link: Bio.linkedin,
            color: '#0077B5'
        },
        {
            name: 'Instagram',
            animation: instagramAnim,
            link: Bio.insta,
            color: '#E4405F'
        },
        {
            name: 'YouTube',
            animation: youtubeAnim,
            link: Bio.youtube || 'https://www.youtube.com/@amal-alexander',
            color: '#FF0000'
        },
        {
            name: 'Gmail',
            animation: gmailAnim,
            link: Bio.email ? `mailto:${Bio.email}` : 'mailto:your.email@gmail.com',
            color: '#EA4335'
        }
    ];

    return (
        <Container id="socials">
            <ParticleContainer>
                <ParticleBackground />
            </ParticleContainer>
            <Wrapper>
                <Title>My Socials</Title>
                <Desc>Feel free to reach out on any of these platforms!</Desc>
                <SocialWrapper>
                    {socialLinks.map((social, index) => (
                        <SocialIcon
                            key={index}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.name}
                            style={{
                                '--hover-color': social.color
                            }}
                        >
                            <IconInner>
                                <Lottie
                                    animationData={social.animation}
                                    {...defaultOptions}
                                    style={{
                                        width: '80%',
                                        height: '80%'
                                    }}
                                />
                            </IconInner>
                        </SocialIcon>
                    ))}
                </SocialWrapper>
            </Wrapper>
        </Container>
    );
};

export default Socials; 