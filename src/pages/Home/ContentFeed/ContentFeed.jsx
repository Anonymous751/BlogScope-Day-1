import React from "react";
import styled from "styled-components";
import { FaClock, FaBook } from "react-icons/fa";
import  { keyframes } from "styled-components";

// Styled components using your color scheme
const FeedWrapper = styled.section`
  padding: 40px 24px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textPrimary};
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 24px;
  border-left: 6px solid ${({ theme }) => theme.accent1};
  padding-left: 12px;
  color: ${({ theme }) => theme.accent1};
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`;

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

const Card = styled.div`
  background-color: ${({ theme }) => theme.navbarCards};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px) scale(1.04);
    box-shadow: 0 12px 24px rgba(0,0,0,0.2);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.accent2};
`;

const CardExcerpt = styled.p`
  flex-grow: 1;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 12px;
`;

const CardDate = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.accent3};
  margin-bottom: 16px;
`;

const ReadMoreButton = styled.button`
  align-self: flex-start;
  background-color: ${({ theme }) => theme.accent1};
  color: white;
  border: none;
  padding: 8px 16px;
  font-weight: 600;
  border-radius: 24px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.accent3};
  }
`;

const ViewPostsButton = styled.button`
  margin: 36px auto 0;
  display: block;
  background-color: ${({ theme }) => theme.accent2};
  color: white;
  border: none;
  padding: 12px 32px;
  font-weight: 700;
  border-radius: 32px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.accent3};
  }
`;

// Dummy data for cards
const posts = [
  {
    id: 1,
    title: 'Exploring the Future of Web Development',
    description: 'An in-depth look into the evolving landscape of web technologies and frameworks.',
    date: '2025-07-30',
    image: 'https://cdn.pixabay.com/photo/2024/09/30/10/13/ai-generated-9085460_640.jpg',
  },
  {
    id: 2,
    title: 'The Rise of Artificial Intelligence in Everyday Life',
    description: 'How AI is transforming various industries and our daily routines.',
    date: '2025-07-28',
    image: 'https://cdn.pixabay.com/photo/2023/02/05/01/09/artificial-intelligence-7768524_640.jpg',
  },
  {
    id: 3,
    title: 'Sustainable Living: Tips for a Greener Lifestyle',
    description: 'Practical advice on reducing your carbon footprint and living sustainably.',
    date: '2025-07-25',
    image: 'https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_640.jpg',
  },
];
// Main ContentFeed Component
export default function ContentFeed() {
  return (
    <FeedWrapper>
      <Title>Trending Now</Title>

      <CardsGrid>
        {posts.map(post => (
          <Card key={post.id}>
            <CardImage src={post.image} alt={post.title} />
            <CardContent>
              <CardTitle>{post.title}</CardTitle>
              <CardExcerpt>{post.excerpt}</CardExcerpt>
              <CardDate>
                <FaClock /> {post.date}
              </CardDate>
              <ReadMoreButton>Read More</ReadMoreButton>
            </CardContent>
          </Card>
        ))}
      </CardsGrid>

      <ViewPostsButton>View Posts</ViewPostsButton>
    </FeedWrapper>
  );
}
