import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Styled components for the purplish dark theme
const FAQContainer = styled.div`
    margin: 2rem 0;
    padding: 2rem;
    border-radius: 8px;
    background-color: #2B2D42;
    color: #FFFFFF; // White text color
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h2`
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: center;
    color: #FFFFFF; // White font for title
`;

const Question = styled(motion.div)`
    cursor: pointer;
    padding: 1.2rem;
    background-color: #4D4F5C;
    border: 1px solid #8D99AE;
    border-radius: 8px;
    margin-bottom: 0.8rem;
    transition: background-color 0.3s, transform 0.3s, color 0.3s;
    color: #FFFFFF; // White question text

    &:hover {
        background-color: #FFD60A;
        color: #2B2D42;
        transform: scale(1.02);
    }
`;

const AnswerWrapper = styled.div`
    overflow: hidden;
`;

const Answer = styled(motion.div)`
    padding: 1rem;
    border-top: 1px solid #8D99AE;
    background-color: #3C3F50;
    color: #FFFFFF; // White font for answer
`;

const FAQ = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const faqs = [
        {
            question: "Who is Amal Alexander?",
            answer: "Amal Alexander is an SEO specialist and web technology programmer with expertise in React, Next.js, Node.js, Python, and Streamlit."
        },
        {
            question: "What technologies does Amal Alexander work with?",
            answer: "Amal Alexander specializes in React, Next.js, Node.js, Python, Streamlit, and other web technologies to create efficient and scalable web applications."
        },
        {
            question: "Does Amal Alexander offer SEO services?",
            answer: "Yes, Amal Alexander provides SEO services to help businesses improve their online visibility and search engine rankings."
        },
        {
            question: "Can Amal Alexander build custom web applications?",
            answer: "Yes, Amal Alexander develops custom web applications using modern frameworks like React, Next.js, and Node.js, tailored to meet specific business needs."
        },
        {
            question: "What is Amal Alexander's experience with Python?",
            answer: "Amal Alexander has extensive experience with Python, using it for web development, data analysis, and building tools like Streamlit applications."
        },
        {
            question: "How can I contact Amal Alexander for a project?",
            answer: "You can reach out to Amal Alexander through his professional website or LinkedIn profile to discuss your project requirements."
        }
    ];

    const toggleFAQ = index => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <FAQContainer>
            <Title>Frequently Asked Questions</Title>
            {faqs.map((faq, index) => (
                <div key={index}>
                    <Question
                        onClick={() => toggleFAQ(index)}
                        whileTap={{ scale: 0.98 }}
                    >
                        {faq.question}
                    </Question>
                    <AnimatePresence initial={false}>
                        {expandedIndex === index && (
                            <AnswerWrapper>
                                <Answer
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                >
                                    {faq.answer}
                                </Answer>
                            </AnswerWrapper>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </FAQContainer>
    );
};

export default FAQ;
