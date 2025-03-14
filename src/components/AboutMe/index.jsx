import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  padding: 60px 0;
  max-width: 1100px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.text_primary};
`;

const Content = styled.div`
  font-size: 18px;
  padding: 0 20px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.8;
`;

const AboutMe = () => {
  return (
    <AboutContainer>
      <Title>About Me</Title>
      <Content>
        <p>
          I am a passionate SEO specialist and web technology expert with extensive experience
          in digital marketing and technical optimization. My journey in the digital space
          has equipped me with deep insights into search engine algorithms and user behavior.
        </p>
        <p>
          With a proven track record of improving website rankings and organic traffic,
          I specialize in technical SEO, content strategy, and data-driven optimization
          techniques.
        </p>
      </Content>
    </AboutContainer>
  );
};

export default AboutMe;