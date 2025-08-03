import React from "react";
import styled from "styled-components";
import { FaEdit, FaChartLine, FaLock, FaUsers } from "react-icons/fa";

const Section = styled.section`
  padding: 60px 20px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textPrimary};
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.accent1};
  margin-bottom: 40px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.navbarCards};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.accent2};
  margin-bottom: 10px;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 10px;
`;

const CardText = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textPrimary};
`;

const cardData = [
  {
    id: 1,
    image:
      "https://cdn.pixabay.com/photo/2015/12/04/14/49/hand-1076597_640.jpg",
    icon: <FaEdit />,
    title: "Easy Post Creation",
    text: "Write and publish your thoughts seamlessly with our intuitive editor.",
  },
  {
    id: 2,
    image:
      "https://cdn.pixabay.com/photo/2023/11/21/17/28/market-analytics-8403845_640.png",
    icon: <FaChartLine />,
    title: "Analytics & Insights",
    text: "Track your post views, engagement, and grow your influence with data.",
  },
  {
    id: 3,
    image:
      "https://cdn.pixabay.com/photo/2018/03/21/15/04/regulation-3246979_640.jpg",
    icon: <FaLock />,
    title: "Secure & Private",
    text: "Your content and data are protected with industry-standard security.",
  },
  {
    id: 4,
    image:
      "https://cdn.pixabay.com/photo/2023/09/24/15/54/ai-generated-8273256_640.jpg",
    icon: <FaUsers />,
    title: "Connect With Others",
    text: "Engage with a vibrant community and share your passions with like minds.",
  },
];

const WhyChooseUs = () => {
  return (
    <Section>
      <Title>Why You Choose Us?</Title>

      <CardGrid>
        {cardData.map(({ id, image, icon, title, text }) => (
          <Card key={id}>
            <Image src={image} alt={title} />
            <CardContent>
              <IconWrapper>{icon}</IconWrapper>
              <CardTitle>{title}</CardTitle>
              <CardText>{text}</CardText>
            </CardContent>
          </Card>
        ))}
      </CardGrid>
    </Section>
  );
};

export default WhyChooseUs;
