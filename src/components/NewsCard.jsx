// NewsCard.jsx
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #1c1c2c;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  width: 300px;
  transition: all 0.3s ease-in-out;
  transform-origin: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const Title = styled.h3`
  font-size: 1.4rem;
  margin: 15px 0 10px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #ccc;
  flex-grow: 1;
`;

const Link = styled.a`
  text-decoration: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background-color: #2b2b3d;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #3d3d52;
    transform: translateY(-2px);
  }
`;

const NewsCard = ({ newsItem }) => {
  return (
    <Card>
      <Title>{newsItem.title}</Title>
      <Description>{newsItem.description}</Description>
      <Link href={newsItem.link} target="_blank">
        Read More
      </Link>
    </Card>
  );
};

export default NewsCard;