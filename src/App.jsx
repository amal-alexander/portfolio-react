import React, { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from "styled-components";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { darkTheme, lightTheme } from "./utils/Themes";
import "./App.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from "./components/Navbar";
import Hero from "./components/HeroSection";
import Skills from "./components/Skills";
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetails from './components/ProjectDetails';
import GithubStats from './components/GithubStats';
import Socials from './components/Socials';
import FAQ from './components/FAQ/FAQ';
import BlogDetail from './components/Blog/BlogDetail';
import SEOTool from "./components/SEOTool";
import AboutMe from './components/AboutMe';
import Portfolio from './components/Portfolio';
import BlogPage from './components/Blog/BlogPage';
import TopicCluster from './components/TopicCluster/TopicCluster';
import ContentSimilarity from './components/ContentSimilarity';
import NewsCard from "./components/NewsCard";
import SEONews from "./components/SEONews";



// Inject Speed Insights (DO NOT use it as a component)
injectSpeedInsights();

// Styled Components
const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  background: linear-gradient(
    38.73deg, 
    rgba(204, 0, 187, 0.15) 0%, 
    rgba(201, 32, 184, 0) 50%
  ), linear-gradient(
    141.27deg, 
    rgba(0, 70, 209, 0) 50%, 
    rgba(0, 70, 209, 0.15) 100%
  );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

const MainContent = styled.div`
  padding: 20px;
  min-height: calc(100vh - 70px);
`;

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

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
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

            <MainContent>
              <Routes>
                {/* Home Route */}
                <Route path="/" element={
                  <>
                    <Hero />
                    <Wrapper>
                      <Skills />
                      <Experience />
                    </Wrapper>
                    <GithubStats />
                    <Projects />
                    <Wrapper>
                      <SEONews /> 
                      <Contact />
                      <FAQ />
                    </Wrapper>
                  </>
                } />
                
                {/* Blog Page Routes */}
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                
                {/* SEO Tool Routes */}
                <Route path="/seo-tool" element={<SEOTool />} />
                <Route path="/topic-cluster" element={<TopicCluster />} />
                <Route path="/content-similarity" element={<ContentSimilarity />} />
                
                {/* Portfolio Route */}
                <Route path="/portfolio" element={<Portfolio />} />
                
                {/* About Route */}
                <Route path="/about" element={<AboutMe />} />
              </Routes>
            </MainContent>
            <Footer />
          </Body>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;