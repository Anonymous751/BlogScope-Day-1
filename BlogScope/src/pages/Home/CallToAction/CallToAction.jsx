import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

// Fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Pulse animation for button hover
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(249, 115, 22, 0); }
  100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
`;

const CTAContainer = styled.section`
  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.textPrimary};
  padding: 3rem 2rem;
  max-width: 100%;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  transition: background-color 0.5s ease, color 0.5s ease;
  animation: ${fadeIn} 1s ease forwards;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
  svg {
    fill: ${(props) => props.theme.accent1};
    width: 24px;
    height: 24px;
    transition: fill 0.4s ease;
  }
`;

const Heading = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const Subtext = styled.p`
  font-size: 1.15rem;
  margin-bottom: 2.5rem;
  color: ${(props) => props.theme.textPrimary};
  opacity: 0.85;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled.button`
  background-color: ${(props) => props.theme.accent1};
  color: white;
  border: none;
  padding: 0.85rem 2.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 40px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease, transform 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: ${(props) => props.theme.accent2};
    animation: ${pulse} 1.2s ease;
    transform: scale(1.05);
  }

  &:focus {
    outline: 3px solid ${(props) => props.theme.accent3};
    outline-offset: 4px;
  }
`;

// Icon SVGs (same as before, but you can replace colors via theme)
const StoryIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
      10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

const JoinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.59-5.58L4 12l8 8 8-8z" />
  </svg>
);

export default function CTASection() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <CTAContainer role="region" aria-labelledby="cta-heading">
      <Heading id="cta-heading">
        <IconWrapper><StoryIcon /></IconWrapper>
        Ready to Share Your Story?
      </Heading>
      <Subtext>
        <IconWrapper><JoinIcon /></IconWrapper>
        Join Now and Connect with a Thriving Community!
      </Subtext>
      <CTAButton onClick={handleClick} aria-label="Create account and register">
        Create Account
      </CTAButton>
    </CTAContainer>
  );
}
