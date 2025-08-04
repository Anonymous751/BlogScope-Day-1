import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DashboardLayout from "../../Dashboard/DashboardLayout";
import { useNavigate } from "react-router-dom";

const POSTS_PER_PAGE = 6;

// 🔄 Fetch Functions
const fetchPosts = async () => {
  const res = await axios.get("http://localhost:3000/posts");
  return res.data;
};

const fetchUsers = async () => {
  const res = await axios.get("http://localhost:3000/users");
  return res.data;
};

const AllPosts = () => {
  const navigate = useNavigate();
  const [usersMap, setUsersMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const { data: posts = [], isLoading: postsLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
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
      <Wrapper>
        <ContentCard>
          <Heading>All Users' Posts</Heading>

          <Grid>
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
                >
                  <UserHeader>
                    <ProfilePic src={user?.profilePicture} alt="profile" />
                    <Username>{user?.fullname}</Username>
                  </UserHeader>
                  <Title>{post.title}</Title>
                  <Content><div dangerouslySetInnerHTML={{ __html: post.content }} /></Content>
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
          </Grid>

          <Pagination>
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
          </Pagination>
        </ContentCard>
      </Wrapper>
    </DashboardLayout>
  );
};

export default AllPosts;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bg};
  min-height: 100vh;
  padding: 2rem;
  transition: all 0.4s ease;
`;

const ContentCard = styled.div`
  background-color: ${({ theme }) => theme.navbarCards};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: background-color 0.4s ease;
`;

const Heading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.accent2};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
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
  border: 2px solid ${({ theme }) => theme.accent2};
`;

const Username = styled.h3`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textPrimary};
`;

const Title = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 0.5rem;
`;

const Content = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 1rem;
`;

const Field = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 0.25rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.navbarCards};
  color: ${({ theme }) => theme.textPrimary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.accent1};
    color: #fff;
  }
`;

const PageNumber = styled.button`
  padding: 0.5rem 0.9rem;
  border-radius: 6px;
  border: none;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.accent2 : theme.navbarCards};
  color: ${({ isActive, theme }) => (isActive ? "#fff" : theme.textPrimary)};
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.accent1};
    color: #fff;
  }
`;
