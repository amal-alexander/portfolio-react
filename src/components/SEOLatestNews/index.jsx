import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Styled Components (unchanged)
const Section = styled.section`
  background: #0f0f1b;
  padding: 60px 20px;
  color: #fff;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.8rem;
  margin-bottom: 40px;
`;

const SliderWrapper = styled.div`
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    padding: 0 10px;
  }

  .slick-prev,
  .slick-next {
    z-index: 10;
  }

  .slick-prev:before,
  .slick-next:before {
    display: none;
  }
`;

const ArrowBtn = styled.button`
  background-color: #2b2b3d;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;

  &.prev {
    left: -50px;

    @media (max-width: 768px) {
      left: -25px;
    }
  }

  &.next {
    right: -50px;

    @media (max-width: 768px) {
      right: -25px;
    }
  }
`;

const Card = styled(motion.div)`
  background-color: #1c1c2c;
  border-radius: 15px;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 400px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  margin: 15px 0 10px;
`;

const CardDesc = styled.p`
  font-size: 1rem;
  color: #ccc;
  flex-grow: 1;
`;

const CardDate = styled.p`
  font-size: 0.9rem;
  color: #888;
  margin: 10px 0;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  background-color: #2a2a4a;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 0.8rem;
  color: #bcbcff;
`;

const ViewBtn = styled.button`
  background: white;
  color: #2e2e50;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background: #ddd;
  }
`;

const PrevArrow = ({ onClick }) => (
  <ArrowBtn className="prev" onClick={onClick}>
    <FaArrowLeft />
  </ArrowBtn>
);

const NextArrow = ({ onClick }) => (
  <ArrowBtn className="next" onClick={onClick}>
    <FaArrowRight />
  </ArrowBtn>
);

const SEOLatestNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    try {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await fetch(
        `${apiUrl}/everything?q=SEO&apiKey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setArticles(data.articles || []);
    } catch (err) {
      setError('Failed to fetch articles. Please try again later.');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Section id="seo-latest-news">
      <Title>SEO Latest News</Title>
      <SliderWrapper>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : error ? (
          <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
        ) : articles.length > 0 ? (
          <StyledSlider {...settings}>
            {articles.slice(0, 6).map((article) => (
              <Card
                key={article.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <CardImage
                  src={
                    article.urlToImage ||
                    'https://via.placeholder.com/400x180?text=No+Image'
                  }
                  alt={article.title}
                />
                <CardContent>
                  <TagList>
                    <Tag>SEO</Tag>
                    <Tag>News</Tag>
                  </TagList>
                  <CardTitle>{article.title}</CardTitle>
                  <CardDesc>
                    {article.description || 'No description available.'}
                  </CardDesc>
                  <CardDate>
                    {new Date(article.publishedAt).toLocaleString()}
                  </CardDate>
                  <ViewBtn onClick={() => window.open(article.url, '_blank')}>
                    Read Full News
                  </ViewBtn>
                </CardContent>
              </Card>
            ))}
          </StyledSlider>
        ) : (
          <p style={{ textAlign: 'center' }}>No articles found.</p>
        )}
      </SliderWrapper>
    </Section>
  );
};

export default SEOLatestNews;