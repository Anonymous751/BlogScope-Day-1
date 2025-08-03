import React, { Component, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Categories from "./pages/Categories/Categories";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Dashboard from "./pages/Dashboard/Dasboard";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Register from "./pages/Accounts/Register/Register";
import SignIn from "./pages/Accounts/SignIn/SignIn";
import EditUser from "./pages/Users/EditUser";
import CreatePosts from "./pages/Users/Posts/CreatePosts";
import AllUsersPosts from "./pages/Users/Posts/AllUsersPosts";
import MyPosts from "./pages/Users/Posts/MyPosts";
import SinglePostPage from "./pages/Users/Posts/SinglePostPage";
import MyProfile from "./pages/Accounts/MyProfile/MyProfile";
import EditPostPage from "./pages/Users/Posts/EditPostPage";
import { AuthProvider } from "./Contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const lightTheme = {
  bg: "#ffffff",
  textPrimary: "#1F2937",
  navbarCards: "#f9fafb",
  accent1: "#f97316",
  accent2: "#a855f7",
  accent3: "#ec4899",
  border: "#e5e7eb",
};

const darkTheme = {
  bg: "#121212",
  textPrimary: "#f3f4f6",
  navbarCards: "#1e1e1e",
  accent1: "#fb923c",
  accent2: "#c084fc",
  accent3: "#f472b6",
  border: "#2e2e2e",
};

function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);

  const router = createBrowserRouter([
    {
      path: "/",
      Component: () => <Layout isDark={isDark} toggleTheme={toggleTheme} />, // pass props here
      children: [
        { index: true, Component: Home },
        { path: "categories", Component: Categories },
        { path: "about", Component: About },
        { path: "contact", Component: Contact },
        {
          path: "dashboard",
          Component: () => (
            <ProtectedRoute>
              <Dashboard isDark={isDark} />
            </ProtectedRoute>
          ),
        },
        { path: "/register", Component: Register },
        { path: "/sign-in", Component: SignIn },
        { path: "edit-user/:id", Component: EditUser },
        {
          path: "create-posts",
          element: (
            <ProtectedRoute>
              <CreatePosts />
            </ProtectedRoute>
          ),
        },
        {
          path: "all-users-posts",
          element: (
            <ProtectedRoute>
              <AllUsersPosts />
            </ProtectedRoute>
          ),
        },
        {
          path: "my-posts",
          element: (
            <ProtectedRoute>
              <MyPosts />
            </ProtectedRoute>
          ),
        },
        { path: "all-users-posts/:postId", Component: SinglePostPage },
        { path: "my-profile", Component: MyProfile },
        { path: "/edit-post/:postId", Component: EditPostPage },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
