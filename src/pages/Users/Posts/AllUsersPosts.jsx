import styled from "styled-components";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import DashboardLayout from "../../Dashboard/DashboardLayout";

const POSTS_PER_PAGE = 6;

const fetchPosts = async () => (await axios.get("http://localhost:3000/posts")).data;
const fetchUsers = async () => (await axios.get("http://localhost:3000/users")).data;

const AllPosts = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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

  const loggedInUser = useMemo(() => {
    try {
      const user = localStorage.getItem("loggedInUser");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }, []);

  const likeMutation = useMutation({
    mutationFn: async ({ postId, newLikesCount }) =>
      axios.patch(`http://localhost:3000/posts/${postId}`, {
        likesCount: newLikesCount,
      }),
    onMutate: async ({ postId, newLikesCount }) => {
      await queryClient.cancelQueries(["posts"]);
      const previous = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (old = []) =>
        old.map((p) =>
          p.id === postId ? { ...p, likesCount: newLikesCount } : p
        )
      );

      return { previous };
    },
    onError: (_err, vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["posts"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleLike = (post) => {
    if (!loggedInUser?.id) {
      alert("Please log in to like posts.");
      return;
    }
    const currentCount = post.likesCount || 0;
    const newCount = currentCount + 1;

    likeMutation.mutate({ postId: post.id, newLikesCount: newCount });
  };

  useEffect(() => {
    if (users.length) {
      const map = {};
      users.forEach((u) => {
        map[u.id] = u;
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <LikeButton
                    whileTap={{ scale: 1.2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(post);
                    }}
                  >
                    <FaHeart />
                    <span>{post.likesCount || 0}</span>
                  </LikeButton>

                  <CardBody onClick={() => navigate(`/all-users-posts/${post.id}`)}>
                    <UserHeader>
                      <ProfilePic src={user?.profilePicture} alt="profile pic" />
                      <Username>{user?.fullname}</Username>
                    </UserHeader>
                    <Title>{post.title}</Title>
                    <Content>
                      <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </Content>
                    <Field>
                      <strong>Category:</strong> {post.category}
                    </Field>
                    <Field>
                      <strong>Created At:</strong>{" "}
                      {new Date(post.createdAt).toLocaleString()}
                    </Field>
                  </CardBody>
                </Card>
              );
            })}
          </Grid>

          <Pagination>
            <PageButton
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
            >
              Back
            </PageButton>
            {[...Array(totalPages)].map((_, idx) => (
              <PageNumber
                key={idx}
                isActive={currentPage === idx + 1}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </PageNumber>
            ))}
            <PageButton
              onClick={() => setCurrentPage((p) => p + 1)}
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
`;

const ContentCard = styled.div`
  background-color: ${({ theme }) => theme.navbarCards};
  padding: 2rem;
  border-radius: 12px;
`;

const Heading = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.accent2};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled(motion.div)`
  position: relative;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 1rem;
  overflow: hidden;
`;

const CardBody = styled.div`
  padding: 1.5rem;
  cursor: pointer;
`;

const LikeButton = styled(motion.div)`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: ${({ theme }) => theme.navbarCards};
  padding: 0.4rem 0.7rem;
  border-radius: 30px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  color: ${({ theme }) => theme.textPrimary};

  svg {
    fill: crimson;
  }

  span {
    color: ${({ theme }) => theme.textPrimary};
  }
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ProfilePic = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const Username = styled.h3`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textPrimary};
`;

const Title = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.textPrimary};
`;

const Content = styled.div`
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageNumber = styled.button`
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.accent2 : theme.navbarCards};
  color: ${({ isActive, theme }) => (isActive ? "#fff" : theme.textPrimary)};
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  cursor: pointer;
`;
