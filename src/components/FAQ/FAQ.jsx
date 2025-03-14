import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FAQContainer = styled(motion.div)`
    margin: 2rem 0;
    padding: 2rem;
    border-radius: 8px;
    background: linear-gradient(45deg, #2B2D42, #4D4F5C);
    color: #FFFFFF;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    animation: gradientBackground 15s ease infinite;

    @media (max-width: 600px) {
        padding: 1.5rem;
    }

    @keyframes gradientBackground {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`;

const Title = styled(motion.h2)`
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: center;
    color: #FFFFFF;

    @media (max-width: 600px) {
        font-size: 1.5rem;
    }
`;

const FAQItem = styled(motion.details)`
    margin-bottom: 0.8rem;
    background-color: #4D4F5C;
    border: 1px solid #8D99AE;
    border-radius: 8px;
    cursor: pointer;
    color: #FFFFFF;
    padding: 1.2rem;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #FFD60A;
        color: #2B2D42;
    }

    summary {
        font-size: 1.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }

    p {
        padding: 1rem;
        background-color: #3C3F50;
        color: #FFFFFF;
        margin-top: 0.5rem;
        border-top: 1px solid #8D99AE;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
    }

    &[open] p {
        max-height: 1000px; /* Large value to allow the content to show */
        transition: max-height 0.5s ease-in; /* Smooth open transition */
    }
`;

const ExpandCollapseIcon = styled.span`
    font-size: 1.5rem;
    transition: transform 0.3s ease;
    
    ${FAQItem}[open] & {
        transform: rotate(45deg); /* Rotate the icon when expanded */
    }
`;

const FAQ = () => {
    const [faqs] = useState([
        {
            question: "Who is Amal Alexander?",
            answer: "Amal Alexander is an SEO specialist and web technology programmer with expertise in React, Next.js, Node.js, Python, and Streamlit."
        },
        {
            question: "What technologies does Amal Alexander work with?",
            answer: "Amal Alexander specializes in React, Next.js, Node.js, Python, Streamlit, and various web technologies to create efficient and scalable web applications."
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
    ]);

    const titleVariants = {
        hidden: { y: -50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <FAQContainer>
            <Title
                variants={titleVariants}
                initial="hidden"
                animate="visible"
            >
                Frequently Asked Questions
            </Title>
            {faqs.map((faq, index) => (
                <FAQItem 
                    key={index} 
                    variants={itemVariants} 
                    initial="hidden" 
                    animate="visible" 
                    transition={{ delay: index * 0.1 }} // Stagger animation based on the index
                    aria-expanded="false"
                >
                    <summary>
                        {faq.question}
                        <ExpandCollapseIcon>+</ExpandCollapseIcon>
                    </summary>
                    <p>{faq.answer}</p>
                </FAQItem>
            ))}
        </FAQContainer>
    );
};

export default FAQ;