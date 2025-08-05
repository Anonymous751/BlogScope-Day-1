import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FiUser } from "react-icons/fi";
import DashboardLayout from "../../Dashboard/DashboardLayout"; // adjust path if needed

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  animation: ${fadeIn} 0.6s ease;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.navbarCards};
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${({ theme }) => theme.accent1};
  margin-bottom: 20px;
`;

const FullName = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.accent1};
  margin-bottom: 8px;
`;

const Role = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 20px;
`;

const Detail = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 12px;
`;

const Bio = styled.p`
  font-style: italic;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 16px;
  font-size: 1rem;
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.accent1};
  margin-bottom: 20px;
`;

const MyProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("loggedInUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <DashboardLayout>
      {!user ? (
        <ProfileContainer>
          <Card><p>Loading profile...</p></Card>
        </ProfileContainer>
      ) : (
        <ProfileContainer>
          <Card>
            <IconWrapper>
              <FiUser />
            </IconWrapper>
            <Avatar src={user.profilePicture} alt={user.fullname} />
            <FullName>{user.fullname}</FullName>
            <Role>{user.role}</Role>
            <Detail><strong>Email:</strong> {user.email}</Detail>
            <Bio>"{user.bio}"</Bio>
          </Card>
        </ProfileContainer>
      )}
    </DashboardLayout>
  );
};

export default MyProfile;
