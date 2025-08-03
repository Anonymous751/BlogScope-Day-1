// PostEditorWithTheme.jsx
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import JoditEditor from "jodit-react";
import axios from "axios";
import styled, { useTheme } from "styled-components";

const Wrapper = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.navbarCards};
  color: ${({ theme }) => theme.textPrimary};
  font-family: "Segoe UI", sans-serif;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out;

  h2 {
    color: ${({ theme }) => theme.accent2};
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
  }

  input,
  select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 12px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 5px;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.textPrimary};
  }

  .error {
    color: red;
    font-size: 0.9rem;
    margin-bottom: 10px;
  }

  button {
    padding: 12px 20px;
    font-size: 16px;
    background-color: ${({ theme }) => theme.accent1};
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s ease;
  }

  button:hover {
    background-color: ${({ theme }) => theme.accent3};
  }

  .meta {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.textPrimary};
    margin-top: 1rem;
    border-top: 1px dashed ${({ theme }) => theme.border};
    padding-top: 1rem;
  }
`;

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  content: Yup.string().required("Content is required"),
  createdBy: Yup.string().required("Please select a user"),
});

function PostEditor() {
  const editor = useRef(null);
  const [users, setUsers] = useState([]);
  const [initialValues, setInitialValues] = useState({
    id: uuidv4(),
    title: "",
    category: "",
    content: "",
    createdBy: "",
    createdAt: new Date().toISOString(),
    likes: [],
  });

  useEffect(() => {
    axios.get("http://localhost:3000/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    const post = {
      ...values,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      likes: [],
    };

    try {
      await axios.post("http://localhost:3000/posts", post);
      alert("Post saved to API!");
      resetForm();
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post.");
    }
  };

  return (
    <Wrapper>
      <h2>Create New Post</h2>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <label htmlFor="title">Title</label>
            <Field name="title" type="text" placeholder="Enter post title" />
            <ErrorMessage name="title" component="div" className="error" />

            <label htmlFor="category">Category</label>
            <Field as="select" name="category">
              <option value="">-- Select Category --</option>
              <option value="news">News</option>
              <option value="tech">Tech</option>
              <option value="life">Life</option>
              <option value="sports">Sports</option>
              <option value="entertainment">Entertainment</option>
            </Field>
            <ErrorMessage name="category" component="div" className="error" />

            <label htmlFor="content">Content</label>
            <JoditEditor
              ref={editor}
              defaultValue={values.content}
              onBlur={(newContent) => setFieldValue("content", newContent)}
              config={{
                readonly: false,
                height: 300,
                toolbarAdaptive: true,
              }}
            />
            <ErrorMessage name="content" component="div" className="error" />

            <label htmlFor="createdBy">Created By</label>
            <Field as="select" name="createdBy">
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name || user.username || `User ${user.id}`}
                </option>
              ))}
            </Field>
            <ErrorMessage name="createdBy" component="div" className="error" />

            <div className="meta">
              <p>
                <b>Post ID:</b> {values.id}
              </p>
              <p>
                <b>Created At:</b> {new Date(values.createdAt).toLocaleString()}
              </p>
              <p>
                <b>Likes:</b> {values.likes.length} users liked this post
              </p>
            </div>

            <button type="submit">Save Post</button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default PostEditor;
