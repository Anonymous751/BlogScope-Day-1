import React from "react";
import styled, { keyframes } from "styled-components";

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    quote:
      "This service exceeded my expectations. Highly recommended!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Mark Thompson",
    quote:
      "Really impressed with the professionalism and quality.",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: 3,
    name: "Samantha Lee",
    quote:
      "Great experience overall, I will definitely return.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "James Parker",
    quote:
      "Good value for money and excellent customer support.",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    id: 5,
    name: "Linda Davis",
    quote:
      "The team was very responsive and attentive to my needs.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 6,
    name: "Michael Brown",
    quote:
      "I’m very satisfied. The product quality is top-notch!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
  },
];

// Fade in animation
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.section`
  width: 100vw;
  padding: 40px 24px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textPrimary};
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 36px;
  color: ${({ theme }) => theme.accent1};
  user-select: none;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.navbarCards};
  border-radius: 20px;
  box-shadow: ${({ theme }) =>
    theme.bg === "#121212"
      ? "0 8px 24px rgba(0,0,0,0.9)"
      : "0 8px 24px rgba(0,0,0,0.1)"};
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeInUp} 0.6s ease forwards;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  cursor: default;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) =>
      theme.bg === "#121212"
        ? "0 16px 48px rgba(0,0,0,1)"
        : "0 16px 48px rgba(0,0,0,0.25)"};
  }
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;  /* circular */
  object-fit: cover;
  margin-bottom: 20px;
  box-shadow: 0 0 0 4px ${({ theme }) => theme.accent1};
`;

const Name = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.accent2};
`;

const Quote = styled.p`
  font-style: italic;
  font-size: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 24px;
  line-height: 1.5;
`;

const Stars = styled.div`
  display: flex;
  gap: 4px;
`;

const Star = styled.span`
  color: ${({ filled, theme }) => (filled ? theme.accent1 : theme.border)};
  font-size: 1.4rem;
  user-select: none;
  cursor: pointer;
  transition: color 0.3s ease;
`;

export default function Testimonials() {
  return (
    <Section>
      <Title>What Our Users Say</Title>
      <Grid>
        {testimonials.map(({ id, name, quote, rating, avatar }) => (
          <Card key={id}>
            <Avatar src={avatar} alt={name} loading="lazy" />
            <Name>{name}</Name>
            <Quote>"{quote}"</Quote>
            <Stars>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} filled={star <= rating}>
                  &#9733;
                </Star>
              ))}
            </Stars>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
