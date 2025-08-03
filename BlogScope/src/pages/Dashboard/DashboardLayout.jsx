import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  position: fixed;
  width: 240px;
  height: 100vh;
  background: ${({ theme }) => theme.navbarCards};
  padding: 32px 24px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  z-index: 100;
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  margin: 16px 0;
  padding: 10px;
  border-radius: 6px;
  font-weight: 500;
  text-decoration: none;
  color: ${({ theme }) => theme.textPrimary};
  transition: 0.3s ease;

  &.active {
    background: ${({ theme }) => theme.accent1}20;
    color: ${({ theme }) => theme.accent1};
    font-weight: 600;
    border-left: 4px solid ${({ theme }) => theme.accent1};
    padding-left: 6px;
  }

  &:hover {
    background: ${({ theme }) => theme.accent1}20;
    color: ${({ theme }) => theme.accent1};
  }
`;

const SidebarLink = styled.div`
  margin: 16px 0;
  padding: 10px;
  border-radius: 6px;
  font-weight: 500;
  color: ${({ theme }) => theme.textPrimary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${({ theme }) => theme.accent1}20;
    color: ${({ theme }) => theme.accent1};
  }
`;

const MainContent = styled.div`
  margin-left: 240px;
  padding: 32px;
  width: 100%;
  background: ${({ theme }) => theme.bg};
  min-height: 100vh;
`;

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/sign-in");
  };

  return (
    <Container>
      <Sidebar>
        <h2 style={{ marginBottom: "1.5rem" }}>My Admin</h2>

        <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
        <StyledNavLink to="/create-posts">Create Posts</StyledNavLink>
        <StyledNavLink to="/all-users-posts">All Users Posts</StyledNavLink>
        <StyledNavLink to="/my-posts">My Posts</StyledNavLink>

        <SidebarLink onClick={handleLogout}>
          <FiLogOut /> Logout
        </SidebarLink>
      </Sidebar>

      <MainContent>{children}</MainContent>
    </Container>
  );
}
