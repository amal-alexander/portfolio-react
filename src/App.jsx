import React, { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from "styled-components";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Theme
import { darkTheme, lightTheme } from './utils/Themes';
import './App.css';

// Components
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
import HeroBgAnimation from './components/HeroBgAnimation';
import FAQ from './components/FAQ/FAQ';
import BlogDetail from './components/Blog/BlogDetail';
import SEOTool from "./components/SEOTool";
import AddPost from './components/Blog/AddPost';
import PostList from './components/Blog/PostList';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollArrow from './components/ScrollArrow';
import AboutMe from './components/AboutMe';
import Portfolio from './components/Portfolio';


// API
import { getPosts, createPost } from './api';

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

const MainContent = styled.div`
  padding: 20px;
  min-height: calc(100vh - 70px); // Adjust based on your navbar height
`;

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts || []);
      } catch (err) {
        setError(err.message || "Failed to fetch posts");
      }
    };

    fetchPosts();
  }, []);

  const handlePostAdded = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  return (
    <ErrorBoundary>
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
              <ScrollArrow />
              
              <MainContent>
                <Routes>
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

                  <Route path="/blog" element={
                    <>
                      <h1>Blog</h1>
                      {error ? (
                        <p style={{ color: 'red' }}>Error fetching posts: {error}</p>
                      ) : (
                        <>
                          <AddPost onPostAdded={handlePostAdded} />
                          <PostList posts={posts} />
                        </>
                      )}
                    </>
                  } />

                  <Route path="/blog/:title" element={<BlogDetail />} />
                  <Route path="/seo-tool" element={<SEOTool />} />
                  <Route path="/about-me" element={<AboutMe />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                </Routes>
              </MainContent>

              <Footer />
              {openModal?.state && openModal?.project && (
                <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
              )}
            </Body>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
      <SpeedInsights />
    </ErrorBoundary>
  );
};

export default App;