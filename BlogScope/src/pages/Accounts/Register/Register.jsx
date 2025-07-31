import React from "react";
import styled, { keyframes } from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import Lottie from "lottie-react";
import aiAnimation from "../../../assets/Ai-Analysis.json";

// ==== Animations ====
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ==== Styled Components ====
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textPrimary};
  transition: 0.3s ease all;
  animation: ${fadeIn} 0.8s ease;

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 30px 30px;
  }
`;

const FormWrapper = styled.div`
  flex: 1;
  max-width: 480px;
  padding: 30px 30px;
  background: ${({ theme }) => theme.navbarCards};
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);
  margin-right: 40px;

  @media (max-width: 900px) {
    margin-right: 0;
    margin-bottom: 30px;
    width: 100%;
  }
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.accent1};
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Input = styled.input`
  padding: 12px 16px;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textPrimary};
  transition: all 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.accent1};
    outline: none;
  }
`;

const Select = styled.select`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textPrimary};
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textPrimary};
  min-height: 100px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  background: ${({ theme }) => theme.accent1};
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.accent2};
  }
`;

const ErrorMsg = styled.div`
  font-size: 0.85rem;
  color: red;
  margin-top: -12px;
  margin-bottom: -6px;
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  .lottie {
    width: 100%;
    max-width: 400px;
    animation: ${fadeIn} 1s ease-in-out;
  }

  @media (max-width: 900px) {
    margin-top: 30px;
  }
`;

// ==== Validation Schema ====
const validationSchema = Yup.object({
  fullname: Yup.string()
    .matches(/^[a-zA-Z ]+$/, "Only letters and spaces are allowed")
    .min(3, "At least 3 characters")
    .max(30, "Max 30 characters")
    .required("Full Name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "At least 6 characters")
    .max(20, "Max 20 characters")
    .required("Password is required"),

  role: Yup.string().required("Role is required"),

  profilePicture: Yup.string()
    .url("Invalid URL")
    .required("Profile picture is required"),

  bio: Yup.string()
    .min(10, "Minimum 10 characters")
    .max(200, "Maximum 200 characters")
    .required("Bio is required"),
});

// ==== Component ====
export default function Register() {
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      role: "",
      profilePicture: "",
      bio: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then(() => {
          alert("User Registered Successfully!");
          resetForm();
        })
        .catch((err) => {
          console.error("Error:", err);
          alert("Registration failed!");
        });
    },
  });

  return (
    <Container>
      <FormWrapper>
        <FormTitle>Register New User</FormTitle>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            name="fullname"
            placeholder="Full Name"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fullname && formik.errors.fullname && (
            <ErrorMsg>{formik.errors.fullname}</ErrorMsg>
          )}

          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <ErrorMsg>{formik.errors.email}</ErrorMsg>
          )}

          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <ErrorMsg>{formik.errors.password}</ErrorMsg>
          )}

          <Select
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">-- Select Role --</option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </Select>
          {formik.touched.role && formik.errors.role && (
            <ErrorMsg>{formik.errors.role}</ErrorMsg>
          )}

          <Input
            name="profilePicture"
            placeholder="Profile Picture URL"
            value={formik.values.profilePicture}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.profilePicture && formik.errors.profilePicture && (
            <ErrorMsg>{formik.errors.profilePicture}</ErrorMsg>
          )}

          <TextArea
            name="bio"
            placeholder="Write a short bio..."
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.bio && formik.errors.bio && (
            <ErrorMsg>{formik.errors.bio}</ErrorMsg>
          )}

          <Button type="submit">Register</Button>
        </Form>
      </FormWrapper>

      <ImageWrapper>
        <Lottie animationData={aiAnimation} className="lottie" loop />
      </ImageWrapper>
    </Container>
  );
}
