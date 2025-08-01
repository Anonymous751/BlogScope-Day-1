  import React, { useState } from "react";
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

  const lightTheme = {
    bg: '#ffffff',
    textPrimary: '#1F2937',
    navbarCards: '#f9fafb',
    accent1: '#f97316',
    accent2: '#a855f7',
    accent3: '#ec4899',
    border: '#e5e7eb',
  };

  const darkTheme = {
    bg: '#121212',
    textPrimary: '#f3f4f6',
    navbarCards: '#1e1e1e',
    accent1: '#fb923c',
    accent2: '#c084fc',
    accent3: '#f472b6',
    border: '#2e2e2e',
  };

  function App() {
    const [isDark, setIsDark] = useState(false);
    const toggleTheme = () => setIsDark(prev => !prev);

    const router = createBrowserRouter([
      {
        path: "/",
        Component: () => <Layout isDark={isDark} toggleTheme={toggleTheme} />, // pass props here
      children: [
        { index: true, Component: Home },
        { path: "categories", Component: Categories },
        { path: "about", Component: About },
        { path: "contact", Component: Contact },
        { path: "dashboard", Component: Dashboard },
        {path :"/register", Component:Register},
        {path: "/sign-in", Component:SignIn},
        { path: "edit-user/:id", Component: EditUser },
        { path: "/create-posts", Component:CreatePosts  }
      ],
    },
  ]);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
