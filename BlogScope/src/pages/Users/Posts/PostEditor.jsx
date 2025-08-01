import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import JoditEditor from "jodit-react";

function PostEditor({ currentUser }) {
  console.log("CurrentUser in PostEditor:", currentUser);
  const editor = useRef(null);

  // If no current user or no user ID, prompt login message
  if (!currentUser || !currentUser.id) {
    return <p>Please log in to create a post.</p>;
  }

  // Initialize post state with default values including user info and timestamp
  const [post, setPost] = useState({
    id: uuidv4(),
    title: "",
    category: "",
    content: "",
    createdBy: currentUser.id,
    createdAt: new Date().toISOString(),
    likes: [],
  });

  // Handle changes for input fields: title and category
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  // Handle content changes from the rich text editor
  const handleContentChange = (newContent) => {
    setPost((prev) => ({ ...prev, content: newContent }));
  };

  // On form submit: validate inputs and simulate save
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!post.title.trim()) {
      alert("Title is required");
      return;
    }
    if (!post.category) {
      alert("Category is required");
      return;
    }
    if (!post.content.trim()) {
      alert("Content is required");
      return;
    }

    // Simulate saving (e.g. call your API here)
    console.log("Post saved:", post);
    alert("Post saved!");

    // Reset form with new ID and timestamp
    setPost({
      id: uuidv4(),
      title: "",
      category: "",
      content: "",
      createdBy: currentUser.id,
      createdAt: new Date().toISOString(),
      likes: [],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 800, margin: "auto", fontFamily: "Arial, sans-serif" }}
    >
      <h2>Create New Post</h2>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="title" style={{ display: "block", marginBottom: 4 }}>
          Title:
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={post.title}
          onChange={handleChange}
          placeholder="Enter post title"
          required
          style={{ width: "100%", padding: 8, fontSize: 16 }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="category" style={{ display: "block", marginBottom: 4 }}>
          Category:
        </label>
        <select
          id="category"
          name="category"
          value={post.category}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, fontSize: 16 }}
        >
          <option value="">-- Select Category --</option>
          <option value="news">News</option>
          <option value="tech">Tech</option>
          <option value="life">Life</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="content" style={{ display: "block", marginBottom: 4 }}>
          Content:
        </label>
        <JoditEditor
          ref={editor}
          value={post.content}
          tabIndex={1}
          onChange={handleContentChange}
          config={{ readonly: false, height: 300 }}
        />
      </div>

      {/* Display read-only auto-generated post metadata */}
      <div style={{ marginBottom: 12, fontSize: 14, color: "#555" }}>
        <p><b>Post ID:</b> {post.id}</p>
        <p><b>Created By (User ID):</b> {post.createdBy}</p>
        <p><b>Created At:</b> {new Date(post.createdAt).toLocaleString()}</p>
        <p><b>Likes:</b> {post.likes.length} users liked this post</p>
      </div>

      <button
        type="submit"
        style={{
          padding: "10px 20px",
          fontSize: 16,
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: 4,
        }}
      >
        Save Post
      </button>
    </form>
  );
}

export default PostEditor;
