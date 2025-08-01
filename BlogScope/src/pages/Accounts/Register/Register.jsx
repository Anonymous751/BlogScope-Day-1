import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Lottie from "lottie-react";
import aiAnimation from "../../../assets/Ai-Analysis.json";

// ================= Styled Components =================
const Container = styled.div`
  display: flex;
  padding: 60px;
  gap: 40px;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 30px;
  }
`;

const FormWrapper = styled.div`
  flex: 1;
  max-width: 480px;
  background: ${({ theme }) => theme.navbarCards};
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  color: ${({ theme }) => theme.accent1};
  text-align: center;
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
`;

const TextArea = styled.textarea`
  padding: 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  min-height: 100px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.accent1};
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.div`
  font-size: 0.85rem;
  color: red;
  margin-top: -8px;
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  .lottie {
    width: 100%;
    max-width: 400px;
  }
`;

const ProfileImagePreview = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.bg};
`;

// ================ Yup Validation =================
const validationSchema = Yup.object({
  fullname: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
  role: Yup.string().required("Role is required"),
  profilePicture: Yup.string().url("Invalid URL").required("Profile picture required"),
  bio: Yup.string().min(10).required("Bio is required"),
});

// ================ Main Component =================
export default function Register() {
  const mutation = useMutation({
    mutationFn: (newUser) => axios.post("http://localhost:3000/users", newUser),
    onSuccess: () => {
      alert("User registered successfully!");
      formik.resetForm();
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      alert("Registration failed!");
    },
  });

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
    onSubmit: (values) => {
      mutation.mutate(values);
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

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Input
              name="profilePicture"
              placeholder="Profile Picture URL"
              value={formik.values.profilePicture}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.values.profilePicture && !formik.errors.profilePicture && (
              <ProfileImagePreview src={formik.values.profilePicture} alt="Preview" />
            )}
          </div>
          {formik.touched.profilePicture && formik.errors.profilePicture && (
            <ErrorMsg>{formik.errors.profilePicture}</ErrorMsg>
          )}

          <TextArea
            name="bio"
            placeholder="Short Bio"
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.bio && formik.errors.bio && (
            <ErrorMsg>{formik.errors.bio}</ErrorMsg>
          )}

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Submitting..." : "Register"}
          </Button>
        </Form>
      </FormWrapper>

      <ImageWrapper>
        <Lottie animationData={aiAnimation} className="lottie" loop />
      </ImageWrapper>
    </Container>
  );
}
