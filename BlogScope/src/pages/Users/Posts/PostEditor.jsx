import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import JoditEditor from "jodit-react";
import axios from "axios";
import styled, { useTheme } from "styled-components";

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

// ---------------- Form Validation ----------------

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  content: Yup.string().required("Content is required"),
  createdBy: Yup.string().required("Please select a user"),
});

// ---------------- Style Converter ----------------

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
      const fontFamily = styles["font-family"].toLowerCase();
      if (fontFamily.includes("courier")) el.classList.add("font-courier");
      else if (fontFamily.includes("arial")) el.classList.add("font-arial");
      else if (fontFamily.includes("georgia")) el.classList.add("font-georgia");
      else if (fontFamily.includes("times")) el.classList.add("font-times");
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

function PostEditorB() {
  const editor = useRef(null);
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [savedContent, setSavedContent] = useState("");

  const initialValues = {
    id: uuidv4(),
    title: "",
    category: "",
    content: "",
    createdBy: "",
    createdAt: new Date().toISOString(),
    likes: [],
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error loading users:", err));
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    const cleanedContent = convertStylesToClasses(values.content);
    const post = {
      ...values,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      content: cleanedContent,
      likes: [],
    };

    try {
      await axios.post("http://localhost:3000/posts", post);
      alert("Post saved successfully!");
      setSavedContent(cleanedContent);
      resetForm();
    } catch (err) {
      console.error("Failed to save post:", err);
      alert("Failed to save post.");
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
            <StyledField id="title" name="title" placeholder="Post title" />
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
                toolbarSticky: false,
                toolbarAdaptive: false,
                styleWithCSS: true,
                showCharsCounter: true,
                showWordsCounter: true,
                defaultActionOnPaste: "insert_as_html",
                askBeforePasteHTML: false,
                askBeforePasteFromWord: false,
                uploader: { insertImageAsBase64URI: true },
                theme: theme.bg === "#121212" ? "dark" : "default",
                buttons: [
                  "source",
                  "|",
                  "bold",
                  "italic",
                  "underline",
                  "strikethrough",
                  "|",
                  "ul",
                  "ol",
                  "outdent",
                  "indent",
                  "|",
                  "font",
                  "fontsize",
                  "brush",
                  "paragraph",
                  "|",
                  "image",
                  "table",
                  "link",
                  "|",
                  "align",
                  "undo",
                  "redo",
                  "hr",
                  "|",
                  "copyformat",
                  "fullsize",
                  "selectall",
                  "print",
                  "|",
                  "preview",
                  "find",
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

            <Label htmlFor="createdBy">Created By</Label>
            <StyledSelect
              id="createdBy"
              name="createdBy"
              value={values.createdBy}
              onChange={(e) => setFieldValue("createdBy", e.target.value)}
            >
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name || user.username || `User ${user.id}`}
                </option>
              ))}
            </StyledSelect>
            <ErrorMessage name="createdBy" component={Error} />

            <Meta>
              <p>
                <b>Post ID:</b> {values.id}
              </p>
              <p>
                <b>Created At:</b> {new Date(values.createdAt).toLocaleString()}
              </p>
              <p>
                <b>Likes:</b> {values.likes.length}
              </p>
            </Meta>

            <SubmitButton type="submit">Save Post</SubmitButton>
          </Form>
        )}
      </Formik>

      {savedContent && (
        <>
          <Title>Preview</Title>
          <Preview dangerouslySetHTML={{ __html: savedContent }} />
        </>
      )}
    </Wrapper>
  );
}

export default PostEditorB;
