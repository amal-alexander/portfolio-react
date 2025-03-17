import React from 'react';
import styled from 'styled-components';

const Card = styled.a`
  width: 300px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  border-radius: 16px;
  padding: 20px;
  text-decoration: none;
  transition: 0.3s ease;
  &:hover {
    transform: translateY(-6px);
  }
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
`;

const Desc = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 10px;
`;

const NewsCard = ({ news }) => {
  return (
    <Card href={news.link} target="_blank" rel="noopener noreferrer">
      <Title>{news.title}</Title>
      <Desc>{news.description}</Desc>
    </Card>
  );
};

export default NewsCard;
