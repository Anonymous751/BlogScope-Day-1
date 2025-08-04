import React from "react";
import styled, { keyframes } from "styled-components";

const categories = [
  {
    id: 1,
    title: "Tech Innovations",
    description:
      "Explore the latest trends in technology, gadgets, AI, and software development.",
    image:
      "https://cdn.pixabay.com/photo/2023/03/31/07/26/artificial-intelligence-7889375_640.jpg",
    tags: ["AI", "Gadgets", "Software", "Startups"],
  },
  {
    id: 2,
    title: "Travel Destinations",
    description:
      "Discover breathtaking places and travel tips to inspire your next adventure.",
    image:
      "https://cdn.pixabay.com/photo/2019/10/31/09/20/beach-4591457_640.jpg",
    tags: ["Beaches", "Mountains", "City Tours", "Backpacking"],
  },
  {
    id: 3,
    title: "Delicious Food",
    description:
      "Dive into tasty recipes, food culture, and culinary experiences worldwide.",
    image:
      "https://cdn.pixabay.com/photo/2022/05/12/17/05/hamburger-7191900_640.jpg",
    tags: ["Recipes", "Healthy", "Street Food", "Desserts"],
  },
  {
    id: 4,
    title: "Nature & Wildlife",
    description:
      "Get close to nature with stunning wildlife, forests, and eco-friendly ideas.",
    image:
      "https://cdn.pixabay.com/photo/2024/08/24/14/42/elephant-8994442_640.jpg",
    tags: ["Wildlife", "Forests", "Conservation", "Hiking"],
  },
];

// Fade in animation for smooth appearance
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const Section = styled.section`
  width: 100vw;     
  margin: 0;        

  padding: 40px 24px; 
  color: ${({ theme }) => theme.textPrimary};
  background-color: ${({ theme }) => theme.bg};

  box-sizing: border-box; 
`;
const SectionTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.accent1};
  user-select: none;
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 48px;
  padding: 24px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.navbarCards};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) =>
    theme.bg === "#121212"
      ? "0 8px 24px rgba(0, 0, 0, 0.8)"
      : "0 8px 24px rgba(0, 0, 0, 0.1)"};
  cursor: pointer;
  animation: ${fadeInUp} 0.5s ease forwards;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: ${({ theme }) =>
      theme.bg === "#121212"
        ? "0 16px 48px rgba(0, 0, 0, 0.9)"
        : "0 16px 48px rgba(0, 0, 0, 0.2)"};
  }

  flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const TextContent = styled.div`
  flex: 1;
`;

const CategoryTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.accent2};
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.textPrimary};
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Tag = styled.button`
  background-color: ${({ theme }) => theme.accent3};
  color: white;
  border: none;
  padding: 6px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 20px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.accent1};
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  max-width: 480px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${({ theme }) =>
    theme.bg === "#121212"
      ? "0 8px 24px rgba(0,0,0,0.9)"
      : "0 8px 24px rgba(0,0,0,0.15)"};
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.07);
    box-shadow: ${({ theme }) =>
      theme.bg === "#121212"
        ? "0 12px 36px rgba(0,0,0,1)"
        : "0 12px 36px rgba(0,0,0,0.25)"};
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export default function PopularCategories() {
  return (
    <Section>
      <SectionTitle>Popular Categories</SectionTitle>
      {categories.map(({ id, title, description, image, tags }, idx) => (
        <CategoryWrapper key={id} reverse={idx % 2 !== 0}>
          <TextContent>
            <CategoryTitle>{title}</CategoryTitle>
            <Description>{description}</Description>
            <Tags>
              {tags.map((tag) => (
                <Tag
                  key={tag}
                  type="button"
                  onClick={() => alert(`You clicked tag: ${tag}`)}
                >
                  {tag}
                </Tag>
              ))}
            </Tags>
          </TextContent>
          <ImageWrapper>
            <img src={image} alt={title} loading="lazy" />
          </ImageWrapper>
        </CategoryWrapper>
      ))}
    </Section>
  );
}



// Got it! You want your PopularCategories component to fully react to the current theme — like your ContentFeed component does 