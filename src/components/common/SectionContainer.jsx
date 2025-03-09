import React from 'react';
import styled from 'styled-components';
import HeroBgAnimation from '../HeroBgAnimation';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;

const BgContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
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
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
`;

const SectionContainer = ({ children }) => {
  return (
    <Container>
      <BgContainer>
        <HeroBgAnimation />
      </BgContainer>
      <Content>
        {children}
      </Content>
    </Container>
  );
};

export default SectionContainer; 