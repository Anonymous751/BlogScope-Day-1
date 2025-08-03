import React from "react";
import styled, { keyframes } from "styled-components";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaGlobe } from "react-icons/fa";
import Footer from "../../components/Footer/Footer"
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

const Container = styled.section`
  width: 100%;
  padding: 25px 65px;
  color: ${({ theme }) => theme.textPrimary};
  background-color: ${({ theme }) => theme.bg};
  animation: ${fadeIn} 0.7s ease forwards;
  transition: color 0.4s ease, background-color 0.4s ease;

  display: flex;
  align-items: flex-start; /* changed for better vertical alignment */
  gap: 40px;

  @media (max-width: 900px) {
    flex-direction: column;
    margin: 40px 16px;
    align-items: stretch;
    padding: 20px 16px;
    gap: 24px;
  }
`;

const ContactInfo = styled.div`
  flex: 1;
  min-width: 300px;

  @media (max-width: 900px) {
    min-width: auto;
  }
`;

const MapWrapper = styled.div`
  flex: 1;
  min-width: 600px;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  position: relative;
  margin-top: 10%; /* Shift map 10% upward */

  iframe {
    width: 100%;
    min-height: 400px;
    border: none;
    border-radius: 25px;
  }

  @media (max-width: 1200px) {
    min-width: 100%;
  }

  @media (max-width: 900px) {
    top: 0;
    min-width: 100%;
    min-height: 320px;
    border-radius: 16px;

    iframe {
      border-radius: 16px;
      min-height: 320px;
    }
  }
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 2.8rem;
  margin-bottom: 40px;
  text-align: center;
  color: ${({ theme }) => theme.accent1};
  user-select: none;
  transition: color 0.4s ease;

  @media (max-width: 900px) {
    font-size: 2.2rem;
    margin-bottom: 24px;
  }
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 1.2rem;
  margin-bottom: 24px;
  transition: color 0.3s ease;

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.accent2};
    font-size: 1.5rem;
    transition: color 0.3s ease;
  }

  a {
    color: ${({ theme }) => theme.accent3};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.accent1};
      text-decoration: underline;
    }
  }

  @media (max-width: 900px) {
    font-size: 1rem;
    margin-bottom: 16px;
  }
`;

const SectionTitle = styled.h2`
  font-weight: 600;
  font-size: 1.6rem;
  margin: 48px 0 20px;
  color: ${({ theme }) => theme.accent2};
  user-select: none;
  transition: color 0.4s ease;

  @media (max-width: 900px) {
    font-size: 1.3rem;
    margin: 32px 0 16px;
  }
`;

const SocialWrapper = styled.div`
  margin-top: 50px;
  text-align: center;
  color: ${({ theme }) => theme.accent3};
  font-size: 1.6rem;

  a {
    margin: 0 16px;
    color: inherit;
    transition: color 0.3s ease;
    display: inline-block;

    &:hover {
      color: ${({ theme }) => theme.accent1};
    }
  }

  @media (max-width: 900px) {
    font-size: 1.3rem;
    margin-top: 32px;

    a {
      margin: 0 12px;
    }
  }
`;

export default function Contact() {
  return (
     <>
    <Container>
      <ContactInfo>
        <Title>Contact Us</Title>

        <SectionTitle>Office Address</SectionTitle>
        <List>
          <ListItem>
            <FaMapMarkerAlt />
            1234 React Lane, JavaScript City, CA 90000, USA
          </ListItem>
        </List>

        <SectionTitle>Phone</SectionTitle>
        <List>
          <ListItem>
            <FaPhoneAlt />
            <a href="tel:+15551234567">+1 (555) 123-4567</a>
          </ListItem>
          <ListItem>
            <FaPhoneAlt />
            <a href="tel:+15557654321">+1 (555) 765-4321 (Support)</a>
          </ListItem>
        </List>

        <SectionTitle>Email</SectionTitle>
        <List>
          <ListItem>
            <FaEnvelope />
            <a href="mailto:contact@yourblog.com">contact@yourblog.com</a>
          </ListItem>
          <ListItem>
            <FaEnvelope />
            <a href="mailto:support@yourblog.com">support@yourblog.com</a>
          </ListItem>
        </List>

        <SectionTitle>Working Hours</SectionTitle>
        <List>
          <ListItem>
            <FaClock />
            Mon - Fri: 9:00 AM - 6:00 PM
          </ListItem>
          <ListItem>
            <FaClock />
            Sat - Sun: Closed
          </ListItem>
        </List>

        <SectionTitle>Website</SectionTitle>
        <List>
          <ListItem>
            <FaGlobe />
            <a href="https://www.yourblog.com" target="_blank" rel="noopener noreferrer">
              www.yourblog.com
            </a>
          </ListItem>
        </List>


      </ContactInfo>

      <MapWrapper>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0199633443685!2d-122.41941518468159!3d37.77492927975933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085818b4b0b2d6f%3A0x3f5bc03c827d6e3d!2s1234%20React%20Lane%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1690909909612!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </MapWrapper>

    </Container>
     <Footer />
    </>
  );
}
