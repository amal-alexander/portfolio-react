import React from 'react';
import styled from 'styled-components';

const Card = styled.a`
  display: flex;
  gap: 28px;
  padding: 20px;
  overflow: visible;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: inherit;
  background-color: ${({ theme }) => theme.card_light};
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 300px;
    margin: 0 auto;
    padding: 15px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 300px;
  height: 160px;
  overflow: hidden;
  position: relative;
  background-color: ${({ theme }) => theme.card_light};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    opacity: 1;
    background-color: ${({ theme }) => theme.card_light};
  }

  ${Card}:hover & img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 140px;
  }
`;

const ContentContainer = styled.div`
  padding: 20px;
  flex: 1;

  @media (max-width: 768px) {
    padding: 15px;
    text-align: center;
  }
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px;
  line-height: 1.4;
  color: white; /* Set title color to white */

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Desc = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 13px;
    margin-top: 8px;
  }
`;

const NewsCard = ({ newsItem }) => {
  const [imageError, setImageError] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleImageError = (e) => {
    setImageError(true);
    e.target.onerror = null;
    e.target.src = `https://via.placeholder.com/300x160?text=${encodeURIComponent(newsItem.title || 'SEO News')}`;
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Card href={newsItem.link} target="_blank" rel="noopener noreferrer">
      <ImageContainer>
        <img 
          src={newsItem.image || `https://via.placeholder.com/300x160?text=${encodeURIComponent(newsItem.title || 'SEO News')}`}
          alt={newsItem.title}
          loading="lazy"
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{
            display: 'block',
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
      </ImageContainer>
      <ContentContainer>
        <Title>{newsItem.title}</Title>
        <Desc>{newsItem.description}</Desc>
      </ContentContainer>
    </Card>
  );
};

export default NewsCard;