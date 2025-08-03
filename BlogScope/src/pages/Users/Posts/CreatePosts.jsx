import React from "react";
import styled from "styled-components";
import PostEditor from "./PostEditor";
import DashboardLayout from "../../Dashboard/DashboardLayout";

const currentUser = {
  fullname: "Karam jyoti",
  email: "Karam12@gmail.com",
  password: "Karam@123",
  bio: "Updated bio ✍️ by New Data",
  profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
  id: "1"
};

function CreatePosts() {
  return (
    <DashboardLayout>
      <ContentCard>
      
        <PostEditor currentUser={currentUser} />
      </ContentCard>
    </DashboardLayout>
  );
}

export default CreatePosts;

const ContentCard = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? "0 4px 20px rgba(255, 255, 255, 0.05)"
      : "0 4px 20px rgba(0, 0, 0, 0.1)"};
  transition: all 0.3s ease;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.heading};
`;
