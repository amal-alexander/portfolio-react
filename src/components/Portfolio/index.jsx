import React from 'react';
import styled from 'styled-components';

const PortfolioContainer = styled.div`
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
`;

const Portfolio = () => {
  return (
    <PortfolioContainer>
      <Title>Portfolio</Title>
      <ProjectsGrid>
        {/* Add your portfolio items here */}
      </ProjectsGrid>
    </PortfolioContainer>
  );
};

export default Portfolio;