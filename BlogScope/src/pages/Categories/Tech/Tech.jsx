
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled, { useTheme } from "styled-components";

const BackgroundWrapper = styled.div`
  min-height: 100vh;      /* Full viewport height */
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textPrimary};
  padding: 2rem;
  transition: background-color 0.3s ease;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 30px  auto;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.navbarCards};
  padding: 2rem;
`;

const Post = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.navbarCards};
  border-radius: 8px;
  border-left: 6px solid ${({ theme }) => theme.accent1};
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.accent1};
`;

export default function Tech() {
  const theme = useTheme();

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts", "tech"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/posts");
      return res.data.filter((post) =>
        post.category &&
        (
          (typeof post.category === "string" && post.category.toLowerCase() === "tech") ||
          (Array.isArray(post.category) && post.category.map(c => c.toLowerCase()).includes("tech"))
        )
      );
    },
  });

  if (isLoading) return <BackgroundWrapper>Loading...</BackgroundWrapper>;

  if (error)
    return (
      <BackgroundWrapper>
        <p>Error loading posts.</p>
        <pre>{error.message}</pre>
      </BackgroundWrapper>
    );

  return (
    <BackgroundWrapper>
      <Container>
        <h2>Tech Posts</h2>
        {posts.length === 0 ? (
          <p>No tech posts found.</p>
        ) : (
          posts.map((post) => (
            <Post key={post.id}>
              <Title>{post.title}</Title>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </Post>
          ))
        )}
      </Container>
    </BackgroundWrapper>
  );
}
