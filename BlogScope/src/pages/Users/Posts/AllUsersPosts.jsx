import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DashboardLayout from "../../Dashboard/DashboardLayout";
import { useNavigate } from "react-router-dom";

const POSTS_PER_PAGE = 6;

const fetchPosts = async () => {

  const res = await axios.get("http://localhost:3000/posts");
  return res.data;
};

const fetchUsers = async () => {
  const res = await axios.get("http://localhost:3000/users");
  return res.data;
};

const AllPosts = () => {
    const navigate = useNavigate(); // 👈 initialize it
  const [usersMap, setUsersMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (users) {
      const map = {};
      users.forEach((user) => {
        map[user.id] = user;
      });
      setUsersMap(map);
    }
  }, [users]);

  if (postsLoading || usersLoading) return <h2>Loading...</h2>;

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const currentPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <DashboardLayout>
      <ContentCard>
        <Heading>All Users' Posts</Heading>
        <Wrapper>
          {currentPosts.map((post) => {
            const user = usersMap[post.createdBy];
            return (
              <Card
                key={post.id}
                onClick={() => navigate(`/all-users-posts/${post.id}`)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                style={{ cursor: "pointer" }}
              >
                <UserHeader>
                  <ProfilePic src={user?.profilePicture} alt="profile" />
                  <Username>{user?.fullname}</Username>
                </UserHeader>
                <Title>{post.title}</Title>
                <Content>{post.content}</Content>
                <Field>
                  <strong>Category:</strong> {post.category}
                </Field>
                <Field>
                  <strong>Created At:</strong>{" "}
                  {new Date(post.createdAt).toLocaleString()}
                </Field>
                <Field>
                  <strong>Likes:</strong> {post.likes?.length || 0}
                </Field>
              </Card>
            );
          })}
        </Wrapper>

        <PaginationWrapper>
          <PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Back
          </PageButton>
          {[...Array(totalPages).keys()].map((n) => (
            <PageNumber
              key={n}
              isActive={currentPage === n + 1}
              onClick={() => handlePageChange(n + 1)}
            >
              {n + 1}
            </PageNumber>
          ))}
          <PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
        </PaginationWrapper>
      </ContentCard>
    </DashboardLayout>
  );
};

export default AllPosts;

const ContentCard = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 2rem;
`;

const Heading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #1f2937;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #a855f7;
`;

const Username = styled.h3`
  font-size: 1.1rem;
  color: #1e293b;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  color: #0f172a;
  margin-bottom: 0.5rem;
`;

const Content = styled.p`
  font-size: 1rem;
  color: #334155;
  margin-bottom: 1rem;
`;

const Field = styled.p`
  font-size: 0.9rem;
  color: #475569;
  margin-bottom: 0.25rem;
`;

// Pagination Styling
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  color: #1f2937;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #d1d5db;
  }
`;

const PageNumber = styled.button`
  padding: 0.5rem 0.9rem;
  border-radius: 6px;
  border: none;
  background-color: ${({ isActive }) => (isActive ? "#a855f7" : "#f3f4f6")};
  color: ${({ isActive }) => (isActive ? "#fff" : "#1f2937")};
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? "#9333ea" : "#e5e7eb")};
  }
`;
