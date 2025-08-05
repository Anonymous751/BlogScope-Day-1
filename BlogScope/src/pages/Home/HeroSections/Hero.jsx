import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeroWrapper = styled.section`
  height: 70vh;
  width: 100%;
  background: url("https://cdn.pixabay.com/photo/2017/03/17/11/38/blog-2151307_640.png") center/cover no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 80vh;
    padding: 0 16px;
  }
`;

const Overlay = styled.div`
  background-color: rgba(0,0,0,0.6);
  position: absolute;
  top: 0; left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: ${({ theme }) => theme.textPrimary};
  max-width: 800px;
  padding: 0 16px;

  h1 {
    font-size: 2.8rem;
    color: ${({ theme }) => theme.accent1};

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    margin: 16px 0;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.textPrimary};
  }
`;

const CTAButton = styled.button`
  margin-top: 20px;
  padding: 12px 28px;
  background-color: ${({ theme }) => theme.accent1};
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.accent2};
  }
`;

export default function Hero() {
  const navigate = useNavigate();

  return (
    <HeroWrapper>
      <Overlay />
      <Content>
        <h1>Welcome to BlogScope</h1>
        <p>Share your ideas and thoughts with the world.</p>
        <p>Create posts, interact with others, and build your audience.</p>
        <CTAButton onClick={() => navigate("/about")}>
          Get Started
        </CTAButton>
      </Content>
    </HeroWrapper>
  );
}
