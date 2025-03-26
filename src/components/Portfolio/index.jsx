import React from 'react';
import styled from 'styled-components';
import ProjectCard from '../Card/ProjectCard';

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

const Description = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 40px;
  color: ${({ theme }) => theme.text_secondary};
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
`;

// Sample portfolio items
const portfolioItems = [
  {
    id: 1,
    title: "SEO Optimization for E-commerce",
    description: "Improved organic search rankings by 45% for a major e-commerce client through technical SEO and content strategy.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNlb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    tags: ["Technical SEO", "Content Strategy", "E-commerce"],
    link: "#"
  },
  {
    id: 2,
    title: "Local SEO Campaign",
    description: "Developed and implemented a local SEO strategy for a chain of retail stores, resulting in a 60% increase in foot traffic.",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9jYWwlMjBzZW98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    tags: ["Local SEO", "Google My Business", "Citation Building"],
    link: "#"
  },
  {
    id: 3,
    title: "Content Marketing Strategy",
    description: "Created a comprehensive content marketing plan that increased organic traffic by 75% and improved conversion rates by 25%.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29udGVudCUyMG1hcmtldGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    tags: ["Content Marketing", "SEO", "Lead Generation"],
    link: "#"
  },
];

const Portfolio = () => {
  const [openModal, setOpenModal] = React.useState({ state: false, project: null });

  return (
    <PortfolioContainer>
      <Title>Portfolio</Title>
      <Description>
        A showcase of my professional work and SEO projects. Each case study demonstrates my approach to solving digital marketing challenges and delivering measurable results.
      </Description>
      <ProjectsGrid>
        {portfolioItems.map((project) => (
          <ProjectCard key={project.id} project={project} setOpenModal={setOpenModal} />
        ))}
      </ProjectsGrid>
    </PortfolioContainer>
  );
};

export default Portfolio;