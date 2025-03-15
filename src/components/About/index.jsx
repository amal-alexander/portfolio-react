import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 0;
`;

const Title = styled.h2`
  font-size: 42px;
  text-align: center;
  margin-bottom: 32px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_primary};
`;

const About = () => {
  return (
    <AboutContainer id="about">
      <Title>About Me</Title>
      <Content>
        <Description>
          I am a passionate software developer with experience in building web applications.
          My focus is on creating efficient, scalable, and user-friendly solutions.
        </Description>
        <Description>
          I work with modern technologies including React, Node.js, and cloud platforms.
          I'm constantly learning and adapting to new technologies in the ever-evolving
          tech landscape.
        </Description>
      </Content>
    </AboutContainer>
  );
};

export default About;
