import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBell, FaSun, FaMoon, FaUser, FaBars, FaTimes, FaCaretDown } from "react-icons/fa";


const lightTheme = {
  bg: '#ffffff',
  textPrimary: '#1F2937',
  navbarCards: '#f9fafb',
  accent1: '#f97316',
  accent2: '#a855f7',
  accent3: '#ec4899',
  border: '#e5e7eb',
};
const ContentWrapper = styled.div`
  margin-left: 250px; /* Matches the width of your fixed sidebar */
  padding: 2rem;
  min-height: 100vh;
  background-color: #f8f9fa;
  transition: all 0.3s ease;
  overflow-y: auto;
  box-sizing: border-box;
`;

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.navbarCards};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 60px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  user-select: none;
  position: fixed; /* <- make it fixed */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const LeftDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  position: relative;
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.accent1};
  cursor: pointer;
  user-select: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: ${({ open }) => (open ? "0" : "-100%")};
    width: 70%;
    height: 100vh;
    background-color: ${({ theme }) => theme.navbarCards};
    flex-direction: column;
    padding: 20px;
    gap: 16px;
    transition: left 0.3s ease;
    box-shadow: 2px 0 8px rgba(0,0,0,0.2);
    z-index: 100;
  }
`;

// NavLink style including active state
const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.textPrimary};
  font-weight: 600;
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 6px;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;
  gap: 4px;

  &.active {
    background-color: ${({ theme }) => theme.accent1};
    color: white;
  }

  &:hover:not(.active) {
    color: ${({ theme }) => theme.accent1};
  }
`;

// Dropdown container for Categories and Account
const Dropdown = styled.div`
  position: absolute;
  top: 35px;
  background-color: ${({ theme }) => theme.navbarCards};
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  border-radius: 8px;
  min-width: 140px;
  z-index: 10;
  overflow: hidden;
  user-select: none;

  // Positioning differs for categories and account dropdowns
  ${({ position }) =>
    position === "categories"
      ? `
    left: 0;
  `
      : `
    right: 0;
  `}

  @media (max-width: 768px) {
    position: static;
    box-shadow: none;
    border-radius: 0;
    min-width: auto;
  }
`;

const DropdownItem = styled.div`
  padding: 10px 20px;
  display: block;
  width: 100%;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textPrimary};
  cursor: pointer;
  transition: background-color 0.25s;

  &:hover {
    background-color: ${({ theme }) => theme.accent3};
    color: white;
  }
`;

// Dropdown wrapper for hover/focus functionality in desktop
const NavItemWithDropdown = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 6px;
  padding: 6px 8px;
  font-weight: 600;
  color: ${({ theme }) => theme.textPrimary};
  user-select: none;

  &.active, &:hover {
    background-color: ${({ theme, active }) => (active ? theme.accent1 : 'transparent')};
    color: ${({ theme, active }) => (active ? 'white' : theme.accent1)};
  }

  @media (max-width: 768px) {
    padding: 10px 0;
  }
`;

const RightDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const SearchInput = styled.input`
  padding: 6px 12px;
  border: 1.5px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  font-size: 0.9rem;
  outline: none;
  width: 180px;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.accent1};
    box-shadow: 0 0 6px ${({ theme }) => theme.accent1};
  }

  @media (max-width: 768px) {
    display: none; /* Hide search on mobile */
  }
`;

const AccountWrapper = styled.div`
  position: relative;
  user-select: none;
`;

const AccountButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 600;
  color: ${({ theme }) => theme.textPrimary};
  border: 1.5px solid ${({ theme }) => theme.border};
  padding: 6px 12px;
  border-radius: 20px;
  transition: border-color 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.accent1};
  }

  @media (max-width: 768px) {
    padding: 6px 8px;
    font-size: 0.9rem;
  }
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: 6px;
  transition: background-color 0.25s;

  &:hover {
    background-color: ${({ theme }) => theme.accent1};
    color: white;
  }
`;

// Hamburger menu button - visible only on mobile
const HamburgerButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.textPrimary};
  padding: 6px;
  border-radius: 6px;
  transition: background-color 0.25s;

  &:hover {
    background-color: ${({ theme }) => theme.accent1};
    color: white;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;
const MainContent = styled.div`
  padding-top: 60px; /* same as Header height */
`;



// Main Header Component
export default function Header({ isDark, toggleTheme }) {
  const navigate = useNavigate()
  const [accountOpen, setAccountOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  // Handlers for dropdown toggling
  const toggleAccountDropdown = () => setAccountOpen((prev) => !prev);
  const closeAccountDropdown = () => setAccountOpen(false);

  const toggleCategoriesDropdown = () => setCategoriesOpen((prev) => !prev);
  const closeCategoriesDropdown = () => setCategoriesOpen(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  // Close menu on nav item click
  const handleNavClick = () => {
    if (menuOpen) closeMenu();
    closeCategoriesDropdown();
    closeAccountDropdown();
  };


  return (

    <HeaderWrapper>

      <LeftDiv>
        <Logo onClick={()=> navigate("/")}>BlogScope</Logo>

        {/* Hamburger for mobile */}
        <HamburgerButton
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </HamburgerButton>

        <Nav open={menuOpen}>

          <StyledNavLink to="/" end onClick={handleNavClick}>
            Home
          </StyledNavLink>

          {/* Categories with dropdown */}
          <NavItemWithDropdown
            onClick={() => {
              // On mobile, toggle dropdown on click
              if (window.innerWidth <= 768) toggleCategoriesDropdown();
            }}
            onMouseEnter={() => {
              if (window.innerWidth > 768) setCategoriesOpen(true);
            }}
            onMouseLeave={() => {
              if (window.innerWidth > 768) setCategoriesOpen(false);
            }}
            active={window.location.pathname.startsWith("/categories")}
          >
            Categories <FaCaretDown />
            {categoriesOpen && (
              <Dropdown position="categories" onMouseLeave={closeCategoriesDropdown}>
                <StyledNavLink to="/categories/tech" onClick={handleNavClick}>
                  <DropdownItem>Tech</DropdownItem>
                </StyledNavLink>
                <StyledNavLink to="/categories/lifestyle" onClick={handleNavClick}>
                  <DropdownItem>LifeStyle</DropdownItem>
                </StyledNavLink>
                <StyledNavLink to="/categories/travels" onClick={handleNavClick}>
                  <DropdownItem>Travels</DropdownItem>
                </StyledNavLink>
                <StyledNavLink to="/categories/others" onClick={handleNavClick}>
                  <DropdownItem>Others</DropdownItem>
                </StyledNavLink>
              </Dropdown>
            )}
          </NavItemWithDropdown>

          <StyledNavLink to="/about" onClick={handleNavClick}>
            About
          </StyledNavLink>

          <StyledNavLink to="/contact" onClick={handleNavClick}>
            Contact
          </StyledNavLink>


        </Nav>
      </LeftDiv>

      <RightDiv>
        <SearchInput placeholder="Search..." />

        <AccountWrapper>
          <AccountButton
            onClick={toggleAccountDropdown}
            aria-haspopup="true"
            aria-expanded={accountOpen}
          >
            <FaUser />
            Account
          </AccountButton>
          {accountOpen && (
            <Dropdown position="account" onMouseLeave={closeAccountDropdown}>
               <DropdownItem onClick={()=> navigate("/my-profile")} >My Profile</DropdownItem>
              <DropdownItem onClick={()=> navigate("/sign-in")} >Sign In</DropdownItem>
              <DropdownItem onClick={()=> navigate('/register')}>Register</DropdownItem>
            </Dropdown>
          )}
        </AccountWrapper>

        <IconButton title="Notifications" aria-label="Notifications">
          <FaBell />
        </IconButton>

        <IconButton
          title="Toggle Theme"
          aria-label="Toggle Theme"
          onClick={toggleTheme}
        >
          {isDark ? <FaSun /> : <FaMoon />}
        </IconButton>
      </RightDiv>
    </HeaderWrapper>
  );
}

// Dark theme object (used only here for theme switch icon colors)
const darkTheme = {
  bg: "#121212",
  textPrimary: "#f3f4f6",
  navbarCards: "#1e1e1e",
  accent1: "#fb923c",
  accent2: "#c084fc",
  accent3: "#f472b6",
  border: "#2e2e2e",
};



// now, make a Good loking Header with active Navlink functionality i want two divs , left and right , then i left div, I want Logo type Text named as BlogScope then Nav items, Home, Categories, About, Contact, and in Right Div, i need Search Input , Account with Dropdown of SignIn and Register , then Noitification Icon / Then Toggle Theme icon like Switcher ( Moon and Son ) , please make with this color Combination i give you with beautiful and atrractive style ?
