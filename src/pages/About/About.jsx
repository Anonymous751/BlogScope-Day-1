import React from "react";
import styled, { keyframes } from "styled-components";
import Footer from "../../components/Footer/Footer"
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AboutSection = styled.section`
  max-width: 100%;
  margin: 60px auto;
  padding: 20px 36px;
  color: ${({ theme }) => theme.textPrimary};
  background-color: ${({ theme }) => theme.bg};
  animation: ${fadeIn} 0.6s ease forwards;
  transition: color 0.4s ease, background-color 0.4s ease;

  @media (max-width: 768px) {
    margin: 40px 16px;
  }
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.accent1};
  text-align: center;
  user-select: none;
  transition: color 0.4s ease;
`;

const SubHeading = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 32px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.accent2};
  transition: color 0.3s ease;
`;

const Paragraph = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.textPrimary};
  transition: color 0.3s ease;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.accent3};
  font-weight: 600;
`;

export default function About() {
  return (
    <AboutSection>
      <Title>About BlogScope</Title>

      <Paragraph>
        Welcome to <Highlight>BlogScope</Highlight>, your destination for insightful content, cutting-edge tech coverage, lifestyle tips, and more — all wrapped in a beautiful, fast, and theme-aware experience.
      </Paragraph>

      <SubHeading>Our Vision</SubHeading>
      <Paragraph>
        At BlogScope, we aim to create a platform where curiosity meets clarity. Whether you're a tech enthusiast, a creative soul, or just someone looking to learn and explore, we strive to be your go-to resource for high-quality, thoughtfully written articles.
      </Paragraph>

      <SubHeading>What Makes Us Unique?</SubHeading>
      <Paragraph>
        <ul>
          <li><strong>Curated Content:</strong> No fluff. Just meaningful, practical, and exciting reads.</li>
          <li><strong>Theme Switching:</strong> Comfortable reading experience with Dark and Light mode built-in.</li>
          <li><strong>Performance Focus:</strong> Optimized loading, responsive layouts, and accessibility-first design.</li>
          <li><strong>Passionate Community:</strong> We thrive on ideas, discussions, and contributions from writers and readers alike.</li>
        </ul>
      </Paragraph>

      <SubHeading>Behind The Scenes</SubHeading>
      <Paragraph>
        BlogScope is powered by a team of developers, designers, writers, and visionaries who believe in making the web a more engaging and readable space. Every pixel, paragraph, and piece of functionality is crafted with care.
      </Paragraph>

      <SubHeading>Join Our Journey</SubHeading>
      <Paragraph>
        Whether you're here to explore, contribute, or just scroll for hours — thank you for being part of the BlogScope community. There's more to come.
      </Paragraph>
      <Footer />
    </AboutSection>

  );
}
