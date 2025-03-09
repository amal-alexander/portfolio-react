import React from 'react';
import styled from 'styled-components';
import ParticleBackground from '../ParticleBackground';

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
        font-size: 16px;
    }
`;

const TimelineSection = styled.div`
    width: 100%;
    max-width: 1000px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
`;

const TimelineItem = styled.div`
    width: 100%;
    padding: 20px;
    background: ${({ theme }) => theme.card};
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0px 5px 20px rgba(0,0,0,0.2);
    }
`;

const JobTitle = styled.h3`
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 10px;
`;

const Company = styled.div`
    font-size: 18px;
    color: ${({ theme }) => theme.text_secondary};
    font-weight: 500;
    margin-bottom: 15px;
`;

const Duration = styled.div`
    font-size: 16px;
    color: ${({ theme }) => theme.text_secondary + 80};
    margin-bottom: 15px;
`;

const BulletPoints = styled.ul`
    margin-left: 20px;
    list-style-type: disc;
    color: ${({ theme }) => theme.text_primary};
`;

const BulletPoint = styled.li`
    font-size: 16px;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.text_secondary};
`;

const CompanyLogo = styled.img`
    width: ${props => props.main ? '120px' : '100px'};
    height: auto;
    margin-bottom: 10px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.white};
    padding: 8px;
    @media (max-width: 768px) {
        width: ${props => props.main ? '100px' : '80px'};
    }
`;

const CompanyInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 15px;
`;

const Experience = () => {
    const experiences = [
        {
            title: "Senior SEO Specialist",
            company: "Performics",
            logo: "./src/images/images.png",
            isMain: true,
            duration: "2022 - Present",
            achievements: [
                "Increased organic traffic by 150% through strategic SEO implementations",
                "Managed SEO campaigns for Fortune 500 clients with 45% ROI improvement",
                "Led technical SEO audits and implemented optimization strategies",
                "Developed content strategies resulting in 200+ high-authority backlinks"
            ]
        },
        {
            title: "Digital Marketing Specialist",
            company: "Digitas",
            logo: "src/images/bc_web_wise_logo.jpeg",
            isMain: false,
            duration: "2020 - 2022",
            achievements: [
                "Optimized on-page SEO elements increasing keyword rankings by 60%",
                "Conducted competitor analysis and keyword research using SEMrush",
                "Improved client website Core Web Vitals scores by 40%",
                "Implemented structured data markup increasing CTR by 25%"
            ]
        },
        {
            title: "SEO Analyst",
            company: "Promodome",
            logo: "src/images/1630638016567.jpeg",
            isMain: false,
            duration: "2019 - 2020",
            achievements: [
                "Managed local SEO campaigns for multiple business locations",
                "Created monthly SEO performance reports using Google Analytics",
                "Optimized meta tags and content for target keywords",
                "Conducted regular website crawls and fixed technical issues"
            ]
        }
    ];

    return (
        <Container id="experience">
            <ParticleContainer>
                <ParticleBackground />
            </ParticleContainer>
            <Wrapper>
                <Title>Experience</Title>
                <Desc>My professional journey and achievements</Desc>
                <TimelineSection>
                    {experiences.map((exp, index) => (
                        <TimelineItem key={index}>
                            <CompanyInfo>
                                <CompanyLogo 
                                    src={exp.logo} 
                                    alt={exp.company} 
                                    main={exp.isMain}
                                />
                                <div>
                                    <JobTitle>{exp.title}</JobTitle>
                                    <Company>{exp.company}</Company>
                                    <Duration>{exp.duration}</Duration>
                                </div>
                            </CompanyInfo>
                            <BulletPoints>
                                {exp.achievements.map((point, idx) => (
                                    <BulletPoint key={idx}>{point}</BulletPoint>
                                ))}
                            </BulletPoints>
                        </TimelineItem>
                    ))}
                </TimelineSection>
            </Wrapper>
        </Container>
    );
};

export default Experience;


