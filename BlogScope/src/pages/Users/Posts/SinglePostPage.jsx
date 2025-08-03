import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState, useMemo } from "react";
import styled from "styled-components";
import { FaHeart, FaTrash, FaEdit } from "react-icons/fa";

// Styled Components
const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 2rem auto;
  background-color: #fff;
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
  color: #4f46e5;
  margin-bottom: 0.8rem;
`;

const Content = styled.p`
  font-size: 1.1rem;
  color: #374151;
`;

const Divider = styled.div`
  margin: 1.5rem 0;
  height: 1px;
  background: linear-gradient(to right, #c084fc, #60a5fa);
`;

const Meta = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #6b7280;
`;

const LikeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 1rem;
  cursor: pointer;
`;

const HeartIcon = styled(FaHeart)`
  font-size: 22px;
  color: crimson;
  transition: transform 0.2s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  &:hover {
    transform: scale(1.2);
  }
`;

const CommentList = styled.ul`
  margin-top: 0.7rem;
  padding-left: 1rem;
  list-style-type: disc;
  color: #334155;
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
  border: 1px solid #d1d5db;
  outline: none;
  font-size: 1rem;
  background-color: #f9fafb;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #4338ca;
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
    admin: {
      canRead: true,
      canComment: true,
      canLike: true,
      canDelete: true,
      canUpdate: true,
    },
    editor: {
      canRead: true,
      canComment: true,
      canLike: true,
      canDelete: false,
      canUpdate: true,
    },
    viewer: {
      canRead: true,
      canComment: true,
      canLike: true,
      canDelete: false,
      canUpdate: false,
    },
  };

  const can = permissions[userRole] || {};

  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/posts/${postId}`);
      return res.data;
    },
    enabled: !!postId,
  });

  const {
    data: postAuthor,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user", post?.createdBy],
    queryFn: async () =>
      axios
        .get(`http://localhost:3000/users/${post.createdBy}`)
        .then((res) => res.data),
    enabled: !!post?.createdBy,
  });

  const likeMutation = useMutation({
    mutationFn: async () => {
      const updatedLikes = [...(post?.likes || []), loggedInUser?.id];
      return await axios.patch(`http://localhost:3000/posts/${postId}`, {
        likes: updatedLikes,
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["post", postId] }),
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
    mutationFn: async () => {
      return await axios.delete(`http://localhost:3000/posts/${postId}`);
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["post", postId] });
      navigate("/dashboard");
    },
  });

  const handleDeletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate();
    }
  };

  const handleEditPost = () => {
    navigate(`/edit-post/${postId}`);
  };

  if (postLoading || userLoading) return <p>Loading...</p>;
  if (postError || !post) return <p>Error loading post.</p>;
  if (userError) return <p>Error loading author info.</p>;

  return (
    <Container>
      {(can.canUpdate || can.canDelete) && (
        <ActionBar>
          {can.canUpdate && (
            <IconButton title="Edit" onClick={handleEditPost}>
              <FaEdit size={18} color="#4f46e5" />
            </IconButton>
          )}
          {can.canDelete && (
            <IconButton title="Delete" onClick={handleDeletePost}>
              <FaTrash size={18} color="crimson" />
            </IconButton>
          )}
        </ActionBar>
      )}

      <Title>{post.title}</Title>
      <Content>{post.content || "No content available."}</Content>

      <Divider />

      <Meta>
        <strong>Author:</strong> {postAuthor?.name}{" "}
        <span style={{ color: "#9ca3af" }}>(ID: {postAuthor?.id})</span>
      </Meta>

      {can.canLike && (
        <LikeSection onClick={() => likeMutation.mutate()}>
          <HeartIcon />
          <span style={{ fontWeight: 600 }}>
            {post.likes?.length || 0} Likes
          </span>
        </LikeSection>
      )}

      {/* Comments Section */}
      <div style={{ marginTop: "2rem" }}>
        <strong style={{ fontSize: "1.1rem" }}>Comments:</strong>
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
              type="text"
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
