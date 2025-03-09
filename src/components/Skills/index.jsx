import React from 'react';
import styled from 'styled-components'
import { skills } from '../../data/constants'
import SectionContainer from '../common/SectionContainer'
import { motion } from 'framer-motion'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 50px 0px;
`

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
`

const Title = styled(motion.div)`
    font-size: 42px;
    text-align: center;
    font-weight: 600;
    margin-top: 20px;
    color: ${({ theme }) => theme.text_primary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 32px;
    }
`

const Desc = styled(motion.div)`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        font-size: 16px;
    }
`

const SkillsContainer = styled(motion.div)`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    gap: 30px;
    justify-content: center;
`

const Skill = styled(motion.div)`
    width: 100%;
    max-width: 500px;
    background: ${({ theme }) => theme.card};
    border: 0.1px solid #854CE6;
    box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
    border-radius: 16px;
    padding: 18px 36px;
    @media (max-width: 768px) {
        max-width: 400px;
        padding: 10px 36px;
    }
    @media (max-width: 500px) {
        max-width: 330px;
        padding: 10px 36px;
    }
`

const SkillTitle = styled.h2`
    font-size: 28px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_secondary};
    margin-bottom: 20px;
    text-align: center;
`

const SkillList = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 20px;
`

const SkillItem = styled(motion.div)`
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_primary + 80};
    border: 1px solid ${({ theme }) => theme.text_primary + 80};
    border-radius: 12px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px 12px;
    }
    @media (max-width: 500px) {
        font-size: 14px;
        padding: 6px 12px;
    }
`

const SkillImage = styled.img`
    width: 24px;
    height: 24px;
`

const Skills = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <SectionContainer>
            <Container id="skills">
                <Wrapper>
                    <Title
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        Skills
                    </Title>
                    <Desc
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Here are some of my skills on which I have been working on for the past 2 years.
                    </Desc>
                    <SkillsContainer
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {skills.map((skill, index) => (
                            <Skill
                                key={index}
                                variants={itemVariants}
                            >
                                <SkillTitle>{skill.title}</SkillTitle>
                                <SkillList>
                                    {skill.skills.map((item, index) => (
                                        <SkillItem
                                            key={index}
                                            variants={itemVariants}
                                        >
                                            <SkillImage src={item.image}/>
                                            {item.name}
                                        </SkillItem>
                                    ))}
                                </SkillList>
                            </Skill>
                        ))}
                    </SkillsContainer>
                </Wrapper>
            </Container>
        </SectionContainer>
    )
}

export default Skills;