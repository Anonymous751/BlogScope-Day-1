import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState, useMemo } from "react";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";

// Styled Components
const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textPrimary};
  margin: 2rem auto;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", sans-serif;
  position: relative;
`;

const ActionBar = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 12px;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  color: ${({ theme }) => theme.accent1};
  margin-bottom: 0.8rem;
`;

const Content = styled.p`
  font-size: 1.1rem;
`;

const Divider = styled.div`
  margin: 1.5rem 0;
  height: 1px;
  background: linear-gradient(
    to right,
    ${({ theme }) => `${theme.accent2}, ${theme.accent1}`}
  );
`;

const Meta = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.border};
`;

const CommentList = styled.ul`
  margin-top: 0.7rem;
  padding-left: 1rem;
  list-style-type: disc;
`;

const CommentInputWrapper = styled.div`
  margin-top: 1.2rem;
  display: flex;
  gap: 0.5rem;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  outline: none;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.accent1};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.accent2};
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export default function SinglePostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState("");

  const loggedInUser = useMemo(() => {
    try {
      const user = localStorage.getItem("loggedInUser");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }, []);

  const userRole = String(loggedInUser?.role || "")
    .toLowerCase()
    .trim();

  const permissions = {
    admin: { canComment: true, canDelete: true, canUpdate: true },
    editor: { canComment: true, canDelete: false, canUpdate: true },
    viewer: { canComment: true, canDelete: false, canUpdate: false },
  };

  const can = permissions[userRole] || {};

  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () =>
      (await axios.get(`http://localhost:3000/posts/${postId}`)).data,
    enabled: !!postId,
  });

  const { data: postAuthor } = useQuery({
    queryKey: ["user", post?.createdBy],
    queryFn: async () =>
      (await axios.get(`http://localhost:3000/users/${post.createdBy}`)).data,
    enabled: !!post?.createdBy,
  });

  const commentMutation = useMutation({
    mutationFn: async () => {
      const updatedComments = [...(post?.comments || []), newComment];
      return await axios.patch(`http://localhost:3000/posts/${postId}`, {
        comments: updatedComments,
      });
    },
    onSuccess: () => {
      setNewComment("");
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () =>
      await axios.delete(`http://localhost:3000/posts/${postId}`),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["post", postId] });
      navigate("/dashboard");
    },
  });

  if (postLoading) return <p>Loading...</p>;
  if (!post) return <p>Error loading post.</p>;

  return (
    <Container>
      {(can.canUpdate || can.canDelete) && (
        <ActionBar>
          {can.canUpdate && (
            <IconButton
              title="Edit"
              onClick={() => navigate(`/edit-post/${postId}`)}
            >
              <FaEdit size={18} color="#4f46e5" />
            </IconButton>
          )}
          {can.canDelete && (
            <IconButton
              title="Delete"
              onClick={() =>
                window.confirm("Are you sure?") && deleteMutation.mutate()
              }
            >
              <FaTrash size={18} color="crimson" />
            </IconButton>
          )}
        </ActionBar>
      )}

      <Title>{post.title}</Title>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </Content>
      <Divider />
      <Meta>
        <strong>Author:</strong> {postAuthor?.name}{" "}
        <span style={{ color: "#9ca3af" }}>(ID: {postAuthor?.id})</span>
      </Meta>

      <div style={{ marginTop: "2rem" }}>
        <strong>Comments:</strong>
        <CommentList>
          {(post.comments || []).length === 0 ? (
            <li style={{ color: "#9ca3af" }}>No comments yet.</li>
          ) : (
            post.comments.map((comment, i) => <li key={i}>{comment}</li>)
          )}
        </CommentList>

        {can.canComment && (
          <CommentInputWrapper>
            <CommentInput
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <SubmitButton
              onClick={() => {
                if (newComment.trim()) commentMutation.mutate();
              }}
            >
              Submit
            </SubmitButton>
          </CommentInputWrapper>
        )}
      </div>
    </Container>
  );
}
