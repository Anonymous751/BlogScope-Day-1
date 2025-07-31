import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FiUser, FiEye, FiEyeOff } from "react-icons/fi";  
import loginGif from "../../../assets/sign-up.png";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textPrimary};
  transition: all 0.3s ease;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  max-width: 1000px;
  width: 100%;
  animation: ${fadeIn} 0.8s ease;

  @media (max-width: 900px) {
    flex-direction: column-reverse;
  }
`;

const FormBox = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.navbarCards};
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  max-width: 480px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.accent1};
  font-size: 2rem;
  margin-bottom: 24px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  font-size: 3rem;
  color: ${({ theme }) => theme.accent2};
`;

// Password input container with icon inside
const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    flex: 1;
    padding-right: 44px; /* space for the icon */
  }

  svg {
    position: absolute;
    right: 14px;
    cursor: pointer;
    color: ${({ theme }) => theme.border};
    transition: color 0.3s;

    &:hover {
      color: ${({ theme }) => theme.accent1};
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 14px 18px;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textPrimary};
  transition: 0.3s ease all;

  &:focus {
    border-color: ${({ theme }) => theme.accent1};
    outline: none;
  }
`;

const Button = styled.button`
  padding: 14px;
  background: ${({ theme }) => theme.accent1};
  color: #fff;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.accent2};
  }
`;

const ImageBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    max-width: 420px;
    border-radius: 16px;
    animation: ${fadeIn} 1s ease-in-out;
  }

  @media (max-width: 900px) {
    img {
      max-width: 100%;
    }
  }
`;

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log("Login Attempt:", credentials);

    // Add your login fetch logic here
    fetch("http://localhost:3000/users?email=" + credentials.email)
      .then((res) => res.json())
      .then((users) => {
        const user = users.find(
          (u) => u.password === credentials.password
        );
        if (user) {
          alert("Login successful!");
          console.log(user);
        } else {
          alert("Invalid credentials");
        }
      })
      .catch((err) => {
        console.error("Login Error:", err);
      });
  };

  return (
    <Container>
      <Wrapper>
        <FormBox>
          <IconWrapper>
            <FiUser />
          </IconWrapper>
          <Title>Welcome Back!</Title>
          <Form onSubmit={handleLogin}>
            <Input name="email" type="email" placeholder="Email" required />

            <PasswordWrapper>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                autoComplete="current-password"
              />
              {showPassword ? (
                <FiEyeOff onClick={togglePassword} size={22} />
              ) : (
                <FiEye onClick={togglePassword} size={22} />
              )}
            </PasswordWrapper>

            <Button type="submit">Login</Button>
          </Form>
        </FormBox>

        <ImageBox>
          <img src={loginGif} alt="Login Visual" />
        </ImageBox>
      </Wrapper>
    </Container>
  );
}
