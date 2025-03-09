import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence for animations

// Styled components for the purplish dark theme
const FAQContainer = styled.div`
    margin: 2rem 0;
    padding: 2rem;
    border-radius: 8px;
    background-color: var(--header); // Use the specified header color
    color: var(--text-white); // Set text color to white
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const Question = styled(motion.div)`
    cursor: pointer;
    padding: 1rem;
    background-color: var(--bg-gray-400); // Use dark background for questions
    border: 1px solid var(--border-dark-box); // Dark border
    border-radius: 8px;
    margin-bottom: 0.5rem;
    transition: background-color 0.3s;

    &:hover {
        background-color: var(--bg-super-orange); // Highlight on hover
    }
`;

const Answer = styled(motion.div)`
    padding: 1rem;
    border-top: 1px solid var(--border-dark-box); // Dark border for separation
    background-color: var(--bg-gray-300); // Slightly lighter background for answers
    color: var(--text-gray-900); // Dark text for readability
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
            <h2>Frequently Asked Questions</h2>
            {faqs.map((faq, index) => (
                <div key={index}>
                    <Question 
                        onClick={() => toggleFAQ(index)} 
                        whileHover={{ scale: 1.02 }} // Scale animation on hover
                        whileTap={{ scale: 0.98 }} // Scale down on click
                    >
                        {faq.question}
                    </Question>
                    <AnimatePresence>
                        {expandedIndex === index && (
                            <Answer 
                                initial={{ height: 0, opacity: 0 }} 
                                animate={{ height: 'auto', opacity: 1 }} 
                                exit={{ height: 0, opacity: 0 }} 
                                transition={{ duration: 0.3 }} 
                            >
                                {faq.answer}
                            </Answer>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </FAQContainer>
    );
};

export default FAQ;