import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import styled, { keyframes } from "styled-components";

const FormWrapper = styled.div`
  max-width: 480px;
  margin: 40px auto;
  background: ${({ theme }) => theme.navbarCards};
  padding: 32px 24px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h2`
  margin-bottom: 24px;
  color: ${({ theme }) => theme.accent1};
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-top: 18px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.textPrimary};
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 40px 10px 14px; /* extra right padding for icon */
  border-radius: 8px;
  border: 1.5px solid ${({ theme }) => theme.border};
  font-size: 1rem;
  color: ${({ theme }) => theme.textPrimary};
  background: ${({ theme }) => theme.bg};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent1};
    box-shadow: 0 0 8px ${({ theme }) => theme.accent1}88;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.2rem;
  padding: 0;
  display: flex;
  align-items: center;

  &:focus {
    outline: none;
  }

  &:hover {
    color: ${({ theme }) => theme.accent1};
  }
`;

const ImageInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 6px;
`;

const PreviewImage = styled.img`
  max-width: 150px;
  max-height: 150px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid #3498db;
`;

// other styled components unchanged ...

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/users/${id}`);
      return res.data;
    },
  });

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    bio: "",
    profilePicture: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // toggle state

  useEffect(() => {
    if (user) {
      setForm({
        fullname: user.fullname || "",
        email: user.email || "",
        password: user.password || "",
        bio: user.bio || "",
        profilePicture: user.profilePicture || "",
      });
      setImagePreview(user.profilePicture || null);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (file) => {
    // Placeholder for image upload logic
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(imagePreview);
      }, 1000);
    });
  };

  const mutation = useMutation({
    mutationFn: async (updatedUser) => {
      return axios.put(`http://localhost:3000/users/${id}`, updatedUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["user", id]);
      navigate("/dashboard");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedProfilePicture = form.profilePicture;

    if (imageFile) {
      updatedProfilePicture = await uploadImage(imageFile);
    }

    mutation.mutate({
      ...form,
      profilePicture: updatedProfilePicture,
    });
  };

  if (isLoading)
    return <p style={{ textAlign: "center" }}>Loading user data...</p>;

  return (
    <FormWrapper>
      <Title>Edit User</Title>
      <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <Label htmlFor="fullname">Full Name:</Label>
        <Input
          id="fullname"
          type="text"
          value={form.fullname}
          onChange={(e) => setForm({ ...form, fullname: e.target.value })}
          required
        />

        <Label htmlFor="email">Email:</Label>
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <Label htmlFor="password">Password:</Label>
        <InputWrapper>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            autoComplete="new-password"
          />
          <PasswordToggle
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              // Eye with slash icon (hide)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.89 10.89 0 0112 19c-5 0-9.27-3.11-11-7 1.24-2.45 3.44-4.54 6.14-5.46" />
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M14.12 14.12a3 3 0 01-4.24-4.24" />
              </svg>
            ) : (
              // Eye icon (show)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </PasswordToggle>
        </InputWrapper>

        <Label htmlFor="bio">Bio:</Label>
        <textarea
          id="bio"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          style={{
            width: "100%",
            minHeight: "80px",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1.5px solid #ccc",
            fontSize: "1rem",
            resize: "vertical",
            marginTop: "6px",
            color: "#333",
          }}
        />

        <Label>Profile Picture:</Label>
        <ImageInputRow>
          {/* Text input to type URL or any text */}
          <Input
            type="text"
            placeholder="Enter image URL or text"
            value={form.profilePicture}
            onChange={(e) =>
              setForm({ ...form, profilePicture: e.target.value })
            }
          />

          {/* File input to upload image */}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </ImageInputRow>

        {/* Show preview below */}
        {imagePreview && (
          <PreviewImage
            src={imagePreview}
            alt="Image preview"
            style={{ marginTop: "12px" }}
          />
        )}
        <div style={{ marginTop: "28px", display: "flex", gap: "16px" }}>
          <button
            style={{
              flex: 1,
              padding: "12px 20px",
              borderRadius: "10px",
              border: "none",
              fontWeight: "700",
              fontSize: "1.1rem",
              cursor: "pointer",
              color: "white",
              backgroundColor: "#3498db",
            }}
            type="submit"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Saving..." : "Save"}
          </button>
          <button
            style={{
              flex: 1,
              padding: "12px 20px",
              borderRadius: "10px",
              border: "none",
              fontWeight: "700",
              fontSize: "1.1rem",
              cursor: "pointer",
              color: "white",
              backgroundColor: "#e74c3c",
            }}
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>
        </div>
      </form>
    </FormWrapper>
  );
}
