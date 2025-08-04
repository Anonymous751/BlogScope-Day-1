import React from "react";
import styled from "styled-components";
import PostEditor from "./PostEditor";
import DashboardLayout from "../../Dashboard/DashboardLayout";

// 🔒 Replace with actual user data from AuthContext if needed
const currentUser = {
  fullname: "Karam Jyoti",
  email: "Karam12@gmail.com",
  password: "Karam@123",
  bio: "Updated bio ✍️ by New Data",
  profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
  id: "1",
};

function CreatePosts() {
  return (
    <DashboardLayout>
      <Wrapper>
        <Card>
          <Title>Create New Post ✍️</Title>
          <PostEditor currentUser={currentUser} />
        </Card>
      </Wrapper>
    </DashboardLayout>
  );
}

export default CreatePosts;

// 🔷 Styled Components
const Wrapper = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.bg};
  min-height: 100vh;
  transition: all 0.4s ease;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.navbarCards};
  color: ${({ theme }) => theme.textPrimary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: background-color 0.4s ease, color 0.4s ease;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.accent2};
  transition: color 0.4s ease;
`;
