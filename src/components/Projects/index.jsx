import React, { useState } from 'react';
import styled from 'styled-components';
import { projects } from '../../data/constants';
import ProjectCard from '../Card/ProjectCard.jsx';
import SectionContainer from '../common/SectionContainer';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const Container = styled.div`
    background: linear-gradient(343.07deg, rgba(132, 59, 206, 0.06) 5.71%, rgba(132, 59, 206, 0) 64.83%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 98%, 0 100%);
    padding: 50px 20px; /* Adjust padding for mobile */
`;

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center; /* Center for mobile */
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    padding: 10px 0px 100px 0;
    gap: 12px;
`;

export const Title = styled.div`
    font-size: 42px;
    text-align: center;
    font-weight: 600;
    margin-top: 20px;
    color: ${({ theme }) => theme.text_primary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 32px; /* Reduced font size for mobile */
    }
`;

export const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px; /* Reduced font size for mobile */
    }
`;

export const ToggleButtonGroup = styled.div`
    display: flex;
    border: 1.5px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    font-size: 16px;
    border-radius: 12px;
    font-weight: 500;
    margin: 22px 0px;
    flex-wrap: wrap; /* Allow wrapping for smaller screens */
    justify-content: center; /* Center buttons */
    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

export const ToggleButton = styled.div`
    padding: 8px 18px;
    border-radius: 6px;
    cursor: pointer;
    ${({ active, theme }) =>
        active === "true" && `
            background: ${theme.primary + 20};
        `
    }
    &:hover {
        background: ${({ theme }) => theme.primary + 8};
    }
    @media (max-width: 768px) {
        padding: 6px 8px;
        border-radius: 4px;
    }
`;

export const Divider = styled.div`
    width: 1.5px;
    background: ${({ theme }) => theme.primary};
    @media (max-width: 768px) {
        display: none; /* Hide divider on small screens */
    }
`;

const SliderContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 1100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 0 60px;

    @media (max-width: 768px) {
        padding: 0 40px;
    }
`;

const CardContainer = styled(motion.div)`
    display: flex;
    gap: 28px;
    padding: 20px 0;
    overflow: visible;
    width: 100%;
    justify-content: center;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const SliderButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text_primary};
    padding: 12px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    z-index: 2;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
        background: ${({ theme }) => theme.card_light};
        transform: translateY(-50%) scale(1.1);
    }

    ${props => props.direction === 'left' ? 'left: 0;' : 'right: 0;'}

    @media (max-width: 768px) {
        padding: 8px;
        font-size: 14px;
    }
`;

const Projects = ({ openModal, setOpenModal }) => {
    const [toggle, setToggle] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);
    const projectsPerPage = 3;

    const filteredProjects = toggle === 'all' 
        ? projects 
        : projects.filter((item) => item.category === toggle);

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const currentProjects = filteredProjects.slice(
        currentPage * projectsPerPage,
        (currentPage + 1) * projectsPerPage
    );

    return (
        <SectionContainer>
            <Container id="projects">
                <Wrapper>
                    <Title>Projects</Title>
                    <Desc>
                        I have worked on a wide range of projects. From web apps to android apps. Here are some of my projects.
                    </Desc>
                    <ToggleButtonGroup >
                        {toggle === 'all' ?
                            <ToggleButton active="true" onClick={() => setToggle('all')}>All</ToggleButton>
                            :
                            <ToggleButton onClick={() => setToggle('all')}>All</ToggleButton>
                        }
                        <Divider />
                        {toggle === 'web app' ?
                            <ToggleButton active="true" onClick={() => setToggle('web app')}>WEB APPS</ToggleButton>
                            :
                            <ToggleButton onClick={() => setToggle('web app')}>WEB APPS</ToggleButton>
                        }
                        <Divider />
                        {toggle === 'android app' ?
                            <ToggleButton active="true" onClick={() => setToggle('android app')}>ANDROID APPS</ToggleButton>
                            :
                            <ToggleButton onClick={() => setToggle('android app')}>ANDROID APPS</ToggleButton>
                        }
                        <Divider />
                        {toggle === 'machine learning' ?
                            <ToggleButton active="true" onClick={() => setToggle('machine learning')}>MACHINE LEARNING</ToggleButton>
                            :
                            <ToggleButton onClick={() => setToggle('machine learning')}>MACHINE LEARNING</ToggleButton>
                        }
                    </ToggleButtonGroup>
                    <SliderContainer>
                        <SliderButton direction="left" onClick={prevPage}>
                            <FaChevronLeft />
                        </SliderButton>
                        <CardContainer
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {currentProjects.map((project, index) => (
                                <ProjectCard 
                                    key={index} 
                                    project={project} 
                                    openModal={openModal} 
                                    setOpenModal={setOpenModal}
                                />
                            ))}
                        </CardContainer>
                        <SliderButton direction="right" onClick={nextPage}>
                            <FaChevronRight />
                        </SliderButton>
                    </SliderContainer>
                </Wrapper>
            </Container>
        </SectionContainer>
    )
}

export default Projects;