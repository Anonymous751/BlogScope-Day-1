import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import JoditEditor from "jodit-react";

const Wrapper = styled.div`
  max-width: 800px;
  margin: 3rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const EditorContainer = styled.div`
  margin-bottom: 1.5rem;

  .jodit-status-bar {
    display: none;
  }
`;

const Button = styled.button`
  background: #4f46e5;
  color: white;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #4338ca;
  }
`;

export default function EditPostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const editor = useRef(null);

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/posts/${postId}`);
      return res.data;
    },
    enabled: !!postId,
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const updateMutation = useMutation({
    mutationFn: async () => {
      await axios.patch(`http://localhost:3000/posts/${postId}`, {
        title,
        content,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["post", postId]);
      // 👇 Dynamically redirect to /all-users-posts/:userId
      if (post?.userId) {
        navigate(`/all-users-posts/${post.userId}`);
      } else {
        navigate("/"); // fallback
      }
    },
  });

  const handleUpdate = () => {
    if (title.trim() && content.trim()) {
      updateMutation.mutate();
    } else {
      alert("Title and content must not be empty.");
    }
  };

  if (isLoading) return <p>Loading post...</p>;
  if (error) return <p>Failed to load post.</p>;

  return (
    <Wrapper>
      <h2>Edit Post</h2>

      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title"
      />

      <Label>Content</Label>
      <EditorContainer>
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />
      </EditorContainer>

      <Button onClick={handleUpdate}>Update</Button>
    </Wrapper>
  );
}
