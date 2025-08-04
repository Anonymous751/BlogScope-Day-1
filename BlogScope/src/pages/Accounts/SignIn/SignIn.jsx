import { useState } from "react";
import styled, { keyframes, useTheme } from "styled-components";
import { FiUser, FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { Formik, Form, useField, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import loginGif from "../../../assets/sign-up.png";
import * as Yup from "yup";
import { useAuth } from "../../../Contexts/AuthContext";

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

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 4px;
`;

const baseInputStyles = `
  width: 100%;
  padding: 14px 18px 14px 44px; /* default left padding for icon */
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

const EmailInput = styled.input`
  ${baseInputStyles}
`;

const PasswordInput = styled.input`
  ${baseInputStyles}
  padding-left: 44px;  /* for lock icon */
  padding-right: 44px; /* for eye icon */
`;

// Icon base styled component
const IconBase = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

// Email icon on left
const EmailIcon = styled(IconBase)`
  left: 14px;
  color: ${({ theme, hasError }) =>
    hasError ? "red" : theme.mode === "dark" ? "#ddd" : "#444"};
`;

// Password lock icon on left
const LockIcon = styled(IconBase)`
  left: 14px;
  color: ${({ theme, hasError }) =>
    hasError ? "red" : theme.mode === "dark" ? "#ddd" : "#444"};
`;

// Password eye toggle icon on right (clickable)
const EyeIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  cursor: pointer;
  color: ${({ theme, hasError }) =>
    hasError ? "red" : theme.mode === "dark" ? "#ddd" : "#444"};
  transition: color 0.3s ease;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 16px;
  padding-left: 4px;
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
  transition: background 0.3s, opacity 0.3s;
  margin-top: 12px;

  &:hover {
    background: ${({ theme }) => theme.accent2};
  }

  &:disabled {
    background: ${({ theme }) => theme.accent1};
    opacity: 0.5;
    cursor: not-allowed;
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

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.accent1};
  font-size: 3rem;
`;

// Custom Email Field
function EmailField() {
  const theme = useTheme();
  const [field, meta] = useField("email");
  const hasError = meta.touched && meta.error;

  return (
    <>
      <InputWrapper>
        <EmailInput
          {...field}
          type="email"
          placeholder="Email"
          autoComplete="email"
          aria-invalid={hasError ? "true" : "false"}
        />
        <EmailIcon as={FiUser} hasError={hasError} />
      </InputWrapper>
      <ErrorMessage name="email" component={ErrorText} />
    </>
  );
}

// Custom Password Field
function PasswordField({ showPassword, togglePassword }) {
  const theme = useTheme();
  const [field, meta] = useField("password");
  const hasError = meta.touched && meta.error;

  return (
    <>
      <InputWrapper>
        <PasswordInput
          {...field}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          autoComplete="current-password"
          aria-invalid={hasError ? "true" : "false"}
        />
        <LockIcon as={FiLock} hasError={hasError} />
        <EyeIconWrapper onClick={togglePassword} hasError={hasError}>
          {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
        </EyeIconWrapper>
      </InputWrapper>
      <ErrorMessage name="password" component={ErrorText} />
    </>
  );
}

export default function SignIn() {

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

 const { login } = useAuth();

const handleLogin = async (values, { setSubmitting }) => {
  setLoginError("");
  try {
    const res = await fetch(
      `http://localhost:3000/users?email=${encodeURIComponent(values.email)}`
    );
    const users = await res.json();

    if (users.length === 0) {
      setLoginError("No user found with this email.");
    } else {
      const user = users[0];

      if (user.password === values.password) {
        login(user); // ✅ this updates context + localStorage
        navigate("/dashboard"); // ✅ now safe to navigate
      } else {
        setLoginError("Incorrect password.");
      }
    }
  } catch (error) {
    setLoginError("Login failed. Please try again later.");
    console.error("Login error:", error);
  }
  setSubmitting(false);
};

  return (
    <Container>
      <Wrapper>
        <FormBox>
          <IconWrapper>
            <FiUser />
          </IconWrapper>
          <Title>Welcome Back!</Title>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
            validateOnChange
            validateOnBlur
            validateOnMount
          >
            {({ isSubmitting, isValid, dirty }) => (
              <StyledForm>
                <EmailField />
                <PasswordField
                  showPassword={showPassword}
                  togglePassword={togglePassword}
                />

                {loginError && <ErrorText>{loginError}</ErrorText>}

                <Button type="submit" disabled={isSubmitting || !isValid || !dirty}>
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </StyledForm>
            )}
          </Formik>
        </FormBox>

        <ImageBox>
          <img src={loginGif} alt="Login Visual" />
        </ImageBox>
      </Wrapper>
    </Container>
  );
}
