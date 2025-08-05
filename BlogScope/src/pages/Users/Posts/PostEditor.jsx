import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import JoditEditor from "jodit-react";
import axios from "axios";
import styled, { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";

// ---------------- Styled Components ----------------

const Wrapper = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.navbarCards};
  color: ${({ theme }) => theme.textPrimary};
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.accent2};
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textPrimary};
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textPrimary};
`;

const Error = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.accent1};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.accent3};
  }
`;

const Meta = styled.div`
  font-size: 0.85rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed ${({ theme }) => theme.border};
`;

const Preview = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.navbarCards};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.textPrimary};
  min-height: 150px;
  white-space: pre-wrap;
`;

// ---------------- Validation ----------------

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  content: Yup.string().required("Content is required"),
});

// ---------------- Clean Editor Styles ----------------

function convertStylesToClasses(html) {
  const div = document.createElement("div");
  div.innerHTML = html;

  div.querySelectorAll("*").forEach((el) => {
    const style = el.getAttribute("style");
    if (!style) return;

    const styles = style.split(";").reduce((acc, rule) => {
      const [prop, val] = rule.split(":").map((s) => s.trim());
      if (prop && val) acc[prop] = val;
      return acc;
    }, {});

    if (styles["font-family"]) {
      const font = styles["font-family"].toLowerCase();
      if (font.includes("courier")) el.classList.add("font-courier");
      else if (font.includes("arial")) el.classList.add("font-arial");
      else if (font.includes("georgia")) el.classList.add("font-georgia");
      else if (font.includes("times")) el.classList.add("font-times");
    }

    if (styles["font-size"]) {
      const match = styles["font-size"].match(/(\d+)px/);
      if (match) el.classList.add(`font-size-${match[1]}`);
    }

    el.removeAttribute("style");
  });

  return div.innerHTML;
}

// ---------------- Main Component ----------------

function PostEditor() {
  const navigate = useNavigate();
  const editor = useRef(null);
  const theme = useTheme();
  const [savedContent, setSavedContent] = useState("");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const initialValues = {
    title: "",
    category: "",
    content: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (!loggedInUser || !loggedInUser.id) {
      alert("You must be logged in to create a post.");
      return;
    }

    const cleanedContent = convertStylesToClasses(values.content);

    const post = {
      id: uuidv4(),
      title: values.title,
      category: values.category,
      content: cleanedContent,
      createdAt: new Date().toISOString(),
      createdBy: loggedInUser.id,
      likes: [],
      comments: [],
    };

    try {
      await axios.post("http://localhost:3000/posts", post);
      alert("✅ Post saved successfully!");
      setSavedContent(cleanedContent);
      resetForm();
    } catch (err) {
      console.error("❌ Failed to save post:", err);
      alert("❌ Could not save post. Please try again.");
    }
  };

  return (
    <Wrapper>
      <Title>Create New Post</Title>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Label htmlFor="title">Title</Label>
            <StyledField id="title" name="title" placeholder="Post title..." />
            <ErrorMessage name="title" component={Error} />

            <Label htmlFor="category">Category</Label>
            <StyledSelect
              id="category"
              name="category"
              value={values.category}
              onChange={(e) => setFieldValue("category", e.target.value)}
            >
              <option value="">-- Select Category --</option>
              <option value="news">News</option>
              <option value="tech">Tech</option>
              <option value="life">Life</option>
              <option value="sports">Sports</option>
              <option value="entertainment">Entertainment</option>
            </StyledSelect>
            <ErrorMessage name="category" component={Error} />

            <Label htmlFor="content">Content</Label>
            <JoditEditor
              ref={editor}
              value={values.content}
              onBlur={(newContent) => setFieldValue("content", newContent)}
              config={{
                readonly: false,
                height: 400,
                styleWithCSS: true,
                theme: theme.bg === "#121212" ? "dark" : "default",
                toolbarSticky: false,
                defaultActionOnPaste: "insert_as_html",
                uploader: { insertImageAsBase64URI: true },
                buttons: [
                  "source",
                  "|",
                  "bold",
                  "italic",
                  "underline",
                  "|",
                  "ul",
                  "ol",
                  "|",
                  "font",
                  "fontsize",
                  "brush",
                  "|",
                  "image",
                  "link",
                  "|",
                  "align",
                  "undo",
                  "redo",
                  "|",
                  "preview",
                  "selectall",
                  "print",
                ],
                iframeStyle: `
                  body {
                    background-color: ${theme.bg};
                    color: ${theme.textPrimary};
                    font-family: "Segoe UI", sans-serif;
                    padding: 10px;
                  }
                `,
              }}
            />
            <ErrorMessage name="content" component={Error} />

            <Meta>
              <p>
                <b>Author:</b> {loggedInUser?.fullname || "Unknown User"}
              </p>
              <p>
                <b>Created At:</b> {new Date().toLocaleString()}
              </p>
            </Meta>

            <SubmitButton
              type="submit"
              onClick={() => navigate("/all-users-posts")}
            >
              Publish Post
            </SubmitButton>
          </Form>
        )}
      </Formik>

      {savedContent && (
        <>
          <Title>Post Preview</Title>
          <Preview dangerouslySetInnerHTML={{ __html: savedContent }} />
        </>
      )}
    </Wrapper>
  );
}

export default PostEditor;
