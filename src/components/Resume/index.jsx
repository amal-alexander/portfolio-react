import React from 'react';
import styled from 'styled-components';

const ResumeContainer = styled.div`
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
  padding: 20px;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
`;

const Resume = () => {
  return (
    <ResumeContainer>
      <Title>Resume</Title>
      <Content>
        {/* Add your resume content here */}
      </Content>
    </ResumeContainer>
  );
};

export default Resume;