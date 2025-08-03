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
          <Avatar src={user.profilePicture} />
          <UserInfo>
            <h2>{user.fullname}</h2>
            <p>{user.email}</p>
          </UserInfo>
        </UserCard>

        <SectionTitle>My Posts</SectionTitle>

        {isLoading ? (
          <h3>Loading...</h3>
        ) : myPosts.length === 0 ? (
          <NoPosts>You haven't posted anything yet.</NoPosts>
        ) : (
          myPosts.map((post) => (
            <PostCard key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <Meta>{new Date(post.createdAt).toLocaleDateString()}</Meta>
            </PostCard>
          ))
        )}
      </Wrapper>
    </DashboardLayout>
  );
}

// ------------------ Styled Components ------------------ //

const Wrapper = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 30px;
  background: ${({ theme }) => theme.navbarCards || "#f5f5f5"};
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  h2 {
    margin: 0;
    color: ${({ theme }) => theme.text || "#000"};
  }
  p {
    margin: 2px 0;
    color: ${({ theme }) => theme.subtext || "gray"};
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.text || "#000"};
`;

const PostCard = styled.div`
  background: ${({ theme }) => theme.card || "#fff"};
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }

  h4 {
    margin: 0 0 8px;
    color: ${({ theme }) => theme.accent1 || "#3498db"};
  }

  p {
    color: ${({ theme }) => theme.subtext || "#555"};
    margin-bottom: 8px;
  }
`;

const Meta = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.muted || "gray"};
`;

const NoPosts = styled.p`
  color: ${({ theme }) => theme.muted || "#999"};
  font-style: italic;
`;
