import React from 'react';
import styled from 'styled-components'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Snackbar } from '@mui/material';
import SectionContainer from '../common/SectionContainer';
import { motion } from 'framer-motion';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 80px 0px;
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
        margin-top: 12px;
        font-size: 16px;
    }
`

const ContactForm = styled(motion.form)`
    width: 95%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.card};
    padding: 32px;
    border-radius: 16px;
    box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
    margin-top: 28px;
    gap: 12px;
    @media (max-width: 768px) {
        padding: 20px;
        margin-top: 20px;
        gap: 10px;
    }
`;

const ContactInput = styled(motion.input)`
    flex: 1;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.text_secondary};
    outline: none;
    font-size: 18px;
    color: ${({ theme }) => theme.text_primary};
    border-radius: 12px;
    padding: 12px 16px;
    &:focus {
        border: 1px solid ${({ theme }) => theme.primary};
    }
    @media (max-width: 768px) {
        font-size: 16px;
        padding: 10px 14px;
    }
`;

const ContactInputMessage = styled(motion.textarea)`
    flex: 1;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.text_secondary};
    outline: none;
    font-size: 18px;
    color: ${({ theme }) => theme.text_primary};
    border-radius: 12px;
    padding: 12px 16px;
    min-height: 100px;
    &:focus {
        border: 1px solid ${({ theme }) => theme.primary};
    }
    @media (max-width: 768px) {
        font-size: 16px;
        padding: 10px 14px;
        min-height: 80px;
    }
`;

const ContactButton = styled(motion.input)`
    width: 100%;
    text-align: center;
    padding: 13px 16px;
    margin-top: 2px;
    border-radius: 12px;
    border: none;
    color: ${({ theme }) => theme.text_primary};
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
    &:hover {
        transform: scale(1.05);
        transition: all 0.4s ease-in-out;
    }
    @media (max-width: 768px) {
        font-size: 16px;
        padding: 10px 14px;
    }
`;

const ContactTitle = styled(motion.div)`
    font-size: 24px;
    margin-bottom: 6px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
`

const Contact = () => {
    const [open, setOpen] = React.useState(false);
    const form = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_tox98dg', 'template_nv7k7mj', form.current, 'SybVGsYS52j2TfLbi')
            .then((result) => {
                setOpen(true);
                form.current.reset();
            }, (error) => {
                console.log(error.text);
            });
    }

    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const inputVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <SectionContainer>
            <Container id="socials">
                <Wrapper>
                    <Title
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        My Socials
                    </Title>
                    <Desc
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Connect with me on social media or drop me a message!
                    </Desc>
                    <ContactForm
                        ref={form}
                        onSubmit={handleSubmit}
                        variants={formVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <ContactTitle variants={inputVariants}>
                            Email Me 🚀
                        </ContactTitle>
                        <ContactInput
                            placeholder="Your Email"
                            name="from_email"
                            variants={inputVariants}
                            required
                        />
                        <ContactInput
                            placeholder="Your Name"
                            name="from_name"
                            variants={inputVariants}
                            required
                        />
                        <ContactInput
                            placeholder="Subject"
                            name="subject"
                            variants={inputVariants}
                            required
                        />
                        <ContactInputMessage
                            placeholder="Message"
                            rows="4"
                            name="message"
                            variants={inputVariants}
                            required
                        />
                        <ContactButton
                            type="submit"
                            value="Send"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        />
                    </ContactForm>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={() => setOpen(false)}
                        message="Email sent successfully!"
                        severity="success"
                    />
                </Wrapper>
            </Container>
        </SectionContainer>
    )
}

export default Contact;