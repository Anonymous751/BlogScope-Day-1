import React, { useMemo } from "react";
import styled from "styled-components";
import PostEditor from "./PostEditor";
import DashboardLayout from "../../Dashboard/DashboardLayout";

function CreatePosts() {
  const loggedInUser = useMemo(() => {
    try {
      const user = localStorage.getItem("loggedInUser");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }, []);

  if (!loggedInUser) {
    return <h2>Please log in to create a post.</h2>;
  }

  return (
    <DashboardLayout>
      <Wrapper>
        <Card>
          <Title>Create New Post ✍️</Title>
          <PostEditor loggedInUser={loggedInUser} />
        </Card>
      </Wrapper>
    </DashboardLayout>
  );
}

export default CreatePosts;

const Wrapper = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.bg};
  min-height: 100vh;
  transition: all 0.3s ease;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.navbarCards};
  color: ${({ theme }) => theme.textPrimary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.accent2};
`;
