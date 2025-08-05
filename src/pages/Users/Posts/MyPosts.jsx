import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DashboardLayout from "../../Dashboard/DashboardLayout";

// ------------------ Fetching Data ------------------ //

const fetchLoggedInUser = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user?.id) throw new Error("User not logged in");
  return user;
};

const fetchPosts = async () => {
  const res = await axios.get("http://localhost:3000/posts");
  return res.data;
};

// ------------------ Component ------------------ //

export default function MyPosts() {
  const user = fetchLoggedInUser();

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const myPosts = posts.filter((p) => String(p.createdBy) === String(user.id));

  return (
    <DashboardLayout>
      <Wrapper>
        <UserCard>
          <Avatar src={user.profilePicture} alt={user.fullname} />
          <UserInfo>
            <h2>{user.fullname}</h2>
            <p>{user.email}</p>
          </UserInfo>
        </UserCard>

        <SectionTitle>My Posts</SectionTitle>

        {isLoading ? (
          <LoadingText>Loading...</LoadingText>
        ) : myPosts.length === 0 ? (
          <NoPosts>You haven't posted anything yet.</NoPosts>
        ) : (
          <PostsList>
            {myPosts.map((post) => (
              <PostCard key={post.id}>
                <h4>{post.title}</h4>

                <span dangerouslySetInnerHTML={{ __html: post.content }}   ></span>
              
                <Meta>{new Date(post.createdAt).toLocaleDateString()}</Meta>
              </PostCard>
            ))}
          </PostsList>
        )}
      </Wrapper>
    </DashboardLayout>
  );
}

const Wrapper = styled.div`
  max-width: 850px;
  margin: 40px auto;
  padding: 24px;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 12px;
  transition: background-color 0.3s ease;
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 32px;
  background: ${({ theme }) => theme.navbarCards};
  padding: 16px;
  border-radius: 12px;
  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? "0 4px 10px rgba(255, 255, 255, 0.05)"
      : "0 4px 10px rgba(0, 0, 0, 0.05)"};
  transition: background 0.3s ease, box-shadow 0.3s ease;
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  h2 {
    margin: 0;
    color: ${({ theme }) => theme.textPrimary};
    font-size: 1.3rem;
  }

  p {
    margin: 2px 0;
    color: ${({ theme }) => theme.subtext};
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.accent2};
  margin-bottom: 1.2rem;
`;

const LoadingText = styled.h3`
  color: ${({ theme }) => theme.textPrimary};
  text-align: center;
`;

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PostCard = styled.div`
  background: ${({ theme }) => theme.navbarCards};
  padding: 1rem;
  border-radius: 10px;
  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? "0 2px 8px rgba(255, 255, 255, 0.03)"
      : "0 2px 8px rgba(0, 0, 0, 0.05)"};
  transition: background 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  h4 {
    margin: 0 0 6px;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.accent1};
  }

  p {
    color: ${({ theme }) => theme.textPrimary};
    margin-bottom: 8px;
  }
`;

const Meta = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.muted};
`;

const NoPosts = styled.p`
  font-style: italic;
  color: ${({ theme }) => theme.muted};
  text-align: center;
  font-size: 1rem;
`;
