import React from "react";
import styled, { keyframes } from "styled-components";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

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

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.navbarCards};
  color: ${({ theme }) => theme.textPrimary};
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  animation: ${fadeInUp} 0.6s ease forwards;
  user-select: none;
`;

const LinksContainer = styled.nav`
  display: flex;
  gap: 36px;
  margin-bottom: 28px;
  flex-wrap: wrap;
  justify-content: center;
`;

const LinkItem = styled.a`
  color: ${({ theme }) => theme.accent2};
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.accent1};
  }

  &:after {
    content: "";
    position: absolute;
    width: 0%;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${({ theme }) => theme.accent1};
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const SocialMedia = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 36px;
`;

const SocialIcon = styled.a`
  color: ${({ theme }) => theme.accent3};
  font-size: 1.5rem;
  transition: transform 0.3s ease, color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.accent1};
    transform: scale(1.2);
  }
`;
const CopyRight = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) =>
    theme.bg === "#121212" ? "rgba(255, 255, 255, 0.7)" : "rgba(31, 41, 55, 0.7)"};
  text-align: center;
  user-select: none;
  text-shadow: ${({ theme }) =>
    theme.bg === "#121212" ? "0 0 4px rgba(0,0,0,0.6)" : "none"};
`;
export default function Footer() {
  return (
    <FooterWrapper>
      <LinksContainer>
        <LinkItem href="#home">Home</LinkItem>
        <LinkItem href="#about">About</LinkItem>
        <LinkItem href="#services">Services</LinkItem>
        <LinkItem href="#blog">Blog</LinkItem>
        <LinkItem href="#contact">Contact</LinkItem>
        <LinkItem href="#faq">FAQ</LinkItem>
      </LinksContainer>

      <SocialMedia>
        <SocialIcon
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebookF />
        </SocialIcon>
        <SocialIcon
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <FaTwitter />
        </SocialIcon>
        <SocialIcon
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram />
        </SocialIcon>
        <SocialIcon
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedinIn />
        </SocialIcon>
        <SocialIcon
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </SocialIcon>
      </SocialMedia>

      <CopyRight>© {new Date().getFullYear()} Your Company. All rights reserved.</CopyRight>
    </FooterWrapper>
  );
}
