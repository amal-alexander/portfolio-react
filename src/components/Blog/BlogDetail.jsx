"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import styled from "styled-components"
import blogPosts from "../../data/blogPosts"
import Prism from "prismjs"
import "prism-themes/themes/prism-dracula.css"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"
import Lottie from 'lottie-react';

const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const Container = styled.div`
    max-width: 900px;
    margin: 60px auto;
    padding: 40px;
    background-color: ${({ theme }) => theme.card || "#ffffff"};
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    
    @media (max-width: 768px) {
        margin: 30px auto;
        padding: 15px;
    }
    
    @media (max-width: 480px) {
        margin: 20px auto;
        padding: 15px;
    }
`

const Title = styled.h1`
    font-size: 42px;
    margin-bottom: 24px;
    color: ${({ theme }) => theme.text_primary || "#333333"};
    font-weight: 800;
    letter-spacing: -0.5px;
    line-height: 1.3;
    background: linear-gradient(45deg, ${({ theme }) => theme.primary || "#3498db"}, ${({ theme }) => theme.secondary || "#2ecc71"});
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    @media (max-width: 768px) {
        font-size: 28px;
    }
    
    @media (max-width: 480px) {
        font-size: 24px;
    }
`

const Content = styled.div`
    font-size: 18px;
    line-height: 1.9;
    color: ${({ theme }) => theme.text_primary || "#333333"};
    margin: 32px 0;
    opacity: 0;
    animation: fadeIn 0.8s ease forwards 0.2s;
    font-family: 'Inter', sans-serif;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
    font-weight: 400;
    position: relative;
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    p {
        margin-bottom: 24px;
        opacity: 0;
        animation: slideIn 0.6s ease forwards;
        animation-delay: 0.2s;
    }
    
    h2, h3 {
        color: ${({ theme }) => theme.text_primary || "#333333"};
        opacity: 0;
        animation: slideIn 0.6s ease forwards;
        animation-delay: 0.1s;
        position: relative;
        padding-left: 0;
        
        &::before {
            content: '';
            position: absolute;
            left: 0;
            bottom: -8px;
            width: 40px;
            height: 3px;
            background: ${({ theme }) => theme.primary || "#3498db"};
            transform: scaleX(0);
            animation: expandLine 0.6s ease forwards;
            animation-delay: 0.4s;
        }
    }
    
    h2 {
        font-size: 28px;
        font-weight: 600;
        margin: 40px 0 20px;
    }
    
    h3 {
        font-size: 24px;
        font-weight: 600;
        margin: 32px 0 16px;
    }
    
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes expandLine {
        to { transform: scaleX(1); }
    }

    code {
        background-color: ${({ theme }) => theme.card_light || "#1e1e1e"};
        padding: 8px 12px;
        border-radius: 6px;
        font-family: 'Fira Code', monospace;
        font-size: 0.95em;
        color: ${({ theme }) => theme.text_primary || "#e0e0e0"};
        border: 1px solid ${({ theme }) => (theme.primary ? theme.primary + "40" : "#3498db40")};
        text-shadow: none;
        font-weight: 500;
        position: relative;
        display: inline-block;
        padding-right: 40px;
        margin: 4px 0;
        transition: all 0.2s ease;

        &:hover {
            border-color: ${({ theme }) => theme.primary || "#3498db"};
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

            .copy-button {
                opacity: 1;
                transform: translateY(-50%) scale(1);
            }
        }

        .copy-button {
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%) scale(0.9);
            background: ${({ theme }) => theme.primary || "#3498db"};
            color: white;
            border: none;
            border-radius: 4px;
            padding: 4px 8px;
            font-size: 12px;
            cursor: pointer;
            opacity: 0.8;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            gap: 4px;

            svg {
                width: 14px;
                height: 14px;
                fill: currentColor;
            }

            &:hover {
                transform: translateY(-50%) scale(1.1);
                box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
                opacity: 1;
            }

            &.copied {
                background: #2ecc71;
                opacity: 1;
            }
        }
    }

    pre {
        position: relative;
        margin: 32px 0;
        padding: 20px;
        background-color: ${({ theme }) => theme.card_light || "#282a36"};
        border-radius: 8px;
        overflow-x: auto;
        
        .copy-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: ${({ theme }) => theme.primary || "#3498db"};
            color: white;
            border: none;
            border-radius: 4px;
            padding: 6px 12px;
            font-size: 12px;
            cursor: pointer;
            opacity: 0.8;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 4px;
            z-index: 2;

            svg {
                width: 14px;
                height: 14px;
                fill: currentColor;
            }

            &:hover {
                opacity: 1;
                transform: scale(1.05);
            }

            &.copied {
                background: #2ecc71;
            }
        }
    }
    
    pre code {
        background-color: transparent;
        padding: 0;
        border-radius: 0;
        font-family: 'Fira Code', monospace;
        font-size: 0.9em;
        line-height: 1.6;
        text-shadow: none;
        border: none;
        margin: 0;
        white-space: pre;
        color: inherit;
        position: relative;
        display: block;
        width: 100%;
        overflow-x: auto;
    }

        &::before {
            content: attr(data-language);
            position: absolute;
            top: 0;
            right: 0;
            padding: 4px 8px;
            background: ${({ theme }) => theme.primary || "#3498db"};
            color: white;
            font-size: 12px;
            border-radius: 0 8px 0 4px;
        }

        &:hover {
            .copy-button {
                opacity: 1;
            }
        }
    }

    .copy-button {
        position: absolute;
        top: 12px;
        right: 12px;
        padding: 8px 16px;
        background: ${({ theme }) => theme.primary || "#3498db"};
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        color: white;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        opacity: 0.9;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(4px);
        z-index: 10;

        svg {
            width: 18px;
            height: 18px;
            transition: transform 0.3s ease;
        }

        &:hover {
            opacity: 1;
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
            border-color: rgba(255, 255, 255, 0.2);

            svg {
                transform: scale(1.1);
            }
        }

        &.copied {
            background: #2ecc71;
            border-color: rgba(255, 255, 255, 0.3);
            animation: pulse 0.5s ease-in-out;
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    }

    img {
        max-width: 100%;
        border-radius: 8px;
        margin: 24px 0;
    }
    
    @media (max-width: 768px) {
        font-size: 16px;
    }
    
    @media (max-width: 480px) {
        font-size: 15px;
        line-height: 1.6;
    }
`

const Meta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40px 0 32px;
    padding: 24px 0;
    border-image: linear-gradient(90deg, transparent 0%, ${({ theme }) => (theme.primary ? theme.primary + "60" : "#3498db60")} 50%, transparent 100%);
    border-image-slice: 1;
    border-top: 1px solid;
    border-bottom: 1px solid;
    color: ${({ theme }) => theme.text_primary || "#333333"};
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.3px;
    position: relative;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
    &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, ${({ theme }) => (theme.primary ? theme.primary + "40" : "#3498db40")}, transparent);
    }
`

const CoverImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 24px 0;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`

const FAQSection = styled.section`
    margin: 48px 0;
    padding: 32px;
    background: ${({ theme }) => theme.card_light || "#f5f5f5"};
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(5px);
    border: 1px solid ${({ theme }) => (theme.primary ? theme.primary + "20" : "#3498db20")};

    h2 {
        font-size: 28px;
        color: ${({ theme }) => theme.text_primary || "#333333"};
        margin-bottom: 24px;
        font-weight: 700;
    }
`

const FAQItem = styled.div`
    margin-bottom: 24px;
    padding: 16px;
    border-radius: 8px;
    background: ${({ theme }) => theme.card || "#ffffff"};
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
`

const FAQQuestion = styled.h3`
    font-size: 18px;
    color: ${({ theme }) => theme.text_primary || "#333333"};
    margin-bottom: 12px;
    font-weight: 700;
    letter-spacing: 0.3px;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
`

const FAQAnswer = styled.p`
    font-size: 16px;
    color: ${({ theme }) => theme.text_primary || "#333333"};
    line-height: 1.8;
    font-weight: 400;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
    opacity: 0.9;
`

const ImageGallery = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin: 48px 0;
`

const ImageContainer = styled.div`
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    img {
        width: 100%;
        height: auto;
        display: block;
    }
`

const ImageCaption = styled.p`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px;
    background: rgba(0, 0, 0, 0.85);
    color: white;
    margin: 0;
    font-size: 15px;
    text-align: center;
    font-weight: 500;
    letter-spacing: 0.3px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
`

const BackLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    margin-top: 32px;
    padding: 12px 24px;
    border-radius: 8px;
    background: ${({ theme }) => (theme.primary ? theme.primary + "15" : "#3498db15")};
    color: ${({ theme }) => theme.text_primary || "#333333"};
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 0.3px;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid ${({ theme }) => (theme.primary ? theme.primary + "30" : "#3498db30")};
    
    &:before {
        content: '←';
        margin-right: 12px;
        font-weight: 700;
        transition: transform 0.3s ease;
    }
    
    &:hover {
        background: ${({ theme }) => (theme.primary ? theme.primary + "15" : "#3498db15")};
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${({ theme }) => (theme.primary ? theme.primary + "20" : "#3498db20")};
        border-color: ${({ theme }) => (theme.primary ? theme.primary + "50" : "#3498db50")};
    }
    
    &:hover {
        text-decoration: underline;
    }
`

const ErrorContainer = styled.div`
    text-align: center;
    padding: 40px;
    color: ${({ theme }) => theme.text_primary || "#333333"};
`

const LoadingContainer = styled.div`
    text-align: center;
    padding: 40px;
    color: ${({ theme }) => theme.text_primary || "#333333"};
`

const BlogDetail = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [copyTimeout, setCopyTimeout] = useState(null)
  const [copiedCode, setCopiedCode] = useState(null)

  useEffect(() => {
    return () => {
      if (copyTimeout) {
        clearTimeout(copyTimeout)
      }
    }
  }, [copyTimeout])

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError('Invalid URL')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const normalizedSlug = decodeURIComponent(slug.trim().toLowerCase())
        const post = blogPosts.find((post) => 
          post.slug && post.slug.toLowerCase() === normalizedSlug
        )

        if (!post) {
          console.error('Post not found for slug:', normalizedSlug)
          setError('Blog post not found')
          return
        }

        document.title = `${post.title} | Blog`
        setPost(post)
      } catch (err) {
        console.error('Error loading post:', err)
        setError('Failed to load blog post')
      } finally {
        setLoading(false)
      }
    }

    loadPost()

    return () => {
      document.title = 'Blog | Portfolio'
    }
  }, [slug])

  useEffect(() => {
    if (post) {
      // Add a small delay to ensure DOM is fully rendered before highlighting
      const timer = setTimeout(() => {
        Prism.highlightAll()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [post])

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (!post) {
    return (
      <Container>
        <Title>Post not found</Title>
        <BackLink to="/blog">← Back to Blog</BackLink>
      </Container>
    )
  }

  const renderCodeBlock = ({ language, value }) => {
    return (
      <SyntaxHighlighter language={language} style={dracula} showLineNumbers>
        {value}
      </SyntaxHighlighter>
    )
  }

  if (loading) {
    return (
      <LoadingContainer>
        <h2>Loading...</h2>
      </LoadingContainer>
    )
  }

  if (error || !post) {
    return (
      <ErrorContainer>
        <h2>{error || "Blog post not found"}</h2>
        <BackLink to="/blog">← Back to Blog</BackLink>
      </ErrorContainer>
    )
  }

  return (
    <Container>
      <Title>{post.title}</Title>
      <Meta>
        <span>By {post.author}</span>
        <span>{post.date}</span>
      </Meta>

      {post.coverImage && (
        <ImageContainer>
          <div className="lottie-container">
            {typeof post.coverImage === 'object' ? (
              <Lottie
                animationData={post.coverImage}
                loop={true}
                autoplay={true}
                style={{ width: '100%', height: '300px' }}
                rendererSettings={{
                  preserveAspectRatio: 'xMidYMid slice'
                }}
                onError={() => console.error('Failed to load Lottie animation')}
              />
            ) : (
              <img
                src={post.coverImage}
                alt={post.title}
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
            )}
          </div>
        </ImageContainer>
      )}

      <Content>
        <ReactMarkdown
          components={{
            code: ({ node, inline, className, children, ...props }) => {
              const code = String(children).replace(/\n$/, '')
              const match = /language-(\w+)/.exec(className || '')
              const language = match ? match[1] : ''

              if (!inline && language) {
                return (
                  <div style={{ position: 'relative', marginBottom: '24px', marginTop: '24px' }}>
                    <SyntaxHighlighter
                      style={dracula}
                      language={language}
                      showLineNumbers={true}
                      wrapLines={true}
                      customStyle={{
                        borderRadius: '8px',
                        padding: '20px',
                        margin: '0',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                      }}
                      {...props}
                    >
                      {code}
                    </SyntaxHighlighter>
                    <button
                      className={`copy-button ${copiedCode === code ? 'copied' : ''}`}
                      onClick={() => handleCopyCode(code)}
                      style={{ zIndex: 10 }}
                    >
                      {copiedCode === code ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                )
              }
              return <code className={className} {...props}>{children}</code>
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </Content>

      {post.faqs && post.faqs.length > 0 && (
        <FAQSection>
          <h2>Frequently Asked Questions</h2>
          {post.faqs.map((faq, index) => (
            <FAQItem key={index}>
              <FAQQuestion>{faq.question}</FAQQuestion>
              <FAQAnswer>{faq.answer}</FAQAnswer>
            </FAQItem>
          ))}
        </FAQSection>
      )}

      {post.images && post.images.length > 0 && (
        <ImageGallery>
          {post.images.map((image, index) => (
            <ImageContainer key={index}>
              <img src={image.url || "/placeholder.svg"} alt={image.altText} />
              <ImageCaption>{image.caption}</ImageCaption>
            </ImageContainer>
          ))}
        </ImageGallery>
      )}

      <BackLink to="/blog">← Back to Blog</BackLink>
    </Container>
  )
}

export default BlogDetail

