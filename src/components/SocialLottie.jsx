import React from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import instagramAnim from '../images/instagram.json';
import youtubeAnim from '../images/youtube.json';
import gmailAnim from '../images/gmail.json';

const SocialContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding: 20px 0;
`;

const IconsWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
    @media (max-width: 768px) {
        gap: 20px;
    }
`;

const IconLink = styled.a`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    
    &:hover {
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 40px;
        height: 40px;
    }
`;

const SocialLottie = () => {
    const socialLinks = [
        {
            name: 'Instagram',
            animation: instagramAnim,
            link: 'https://www.instagram.com/amal-alexander'
        },
        {
            name: 'YouTube',
            animation: youtubeAnim,
            link: 'https://www.youtube.com/@amal-alexander'
        },
        {
            name: 'Gmail',
            animation: gmailAnim,
            link: 'mailto:your.email@gmail.com'
        }
    ];

    return (
        <SocialContainer>
            <IconsWrapper>
                {socialLinks.map((social, index) => (
                    <IconLink 
                        key={index} 
                        href={social.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={social.name}
                    >
                        <Lottie
                            animationData={social.animation}
                            loop={true}
                            style={{ width: '100%', height: '100%' }}
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => e.currentTarget.stop()}
                        />
                    </IconLink>
                ))}
            </IconsWrapper>
        </SocialContainer>
    );
};

export default SocialLottie; 