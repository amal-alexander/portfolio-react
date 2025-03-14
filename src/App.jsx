import React, { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import './App.css';
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from './utils/Themes';
import Navbar from "./components/Navbar/index";
import Hero from "./components/HeroSection/index";
import Skills from "./components/Skills/index";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Experience from './components/Experience';
import Projects from './components/Projects/index.jsx';
import Contact from './components/Contact/index.jsx';
import Footer from './components/Footer/index.jsx';
import ProjectDetails from './components/ProjectDetails/index.jsx';
import GithubStats from './components/GithubStats';
import Socials from './components/Socials';
import HeroBgAnimation from './components/HeroBgAnimation';
import FAQ from './components/FAQ/FAQ.jsx';
import ScrollArrow from './components/ScrollArrow';
import Blog from './components/Blog'; // Blog main page
import BlogDetail from './components/Blog/BlogDetail'; // Corrected import for individual blog details page
import SEOTool from "./components/SEOTool";
import { SpeedInsights } from "@vercel/speed-insights/react"

// Styled components
const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), 
              linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

const BottomContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BgContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: hidden;
  margin: auto;
  z-index: 0;

  @media (max-width: 960px) {
    justify-content: center;
  }
`;

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  return (
    <HelmetProvider>
      <Helmet>
        <title>Amal Alexander - SEO & Web Technology Expert</title>
        <meta name="description" content="Welcome to the portfolio of Amal Alexander, showcasing skills in web development, data science, and innovative projects." />
        <meta name="keywords" content="Amal Alexander, portfolio, web development, data science, programming, skills, projects" />
        <meta name="author" content="Amal Alexander" />
      </Helmet>

      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Router>
          <Body>
            <Navbar />
            <ScrollArrow />

            <Routes>
              {/* Homepage */}
              <Route path="/" element={
                <>
                  <Hero />
                  <Wrapper>
                    <Skills />
                    <Experience />
                  </Wrapper>
                  <GithubStats />
                  <Projects openModal={openModal} setOpenModal={setOpenModal} />
                  <BottomContainer>
                    <BgContainer>
                      <HeroBgAnimation />
                    </BgContainer>
                    <Wrapper style={{ position: 'relative', zIndex: 1 }}>
                      <Socials />
                      <Contact />
                      <FAQ />
                    </Wrapper>
                  </BottomContainer>
                </>
              } />

              {/* Blog Page */}
              <Route path="/blog" element={<Blog />} />
              {/* Blog Detail Page */}
              <Route path="/blog/:title" element={<BlogDetail />} />
              
              {/* SEO Tool Page */}
              <Route path="/seo-tool" element={<SEOTool />} />
            </Routes>

            <Footer />
            {openModal.state && (
              <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
            )}
          </Body>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;