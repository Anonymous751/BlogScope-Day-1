// Dashboard.jsx
import React, { useState } from "react";
import styled, { useTheme, keyframes } from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  FiLogOut,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Styled Components & animations (same as your original Dashboard)

const fadeSlideIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// Container, Sidebar, SidebarLink, etc... (copy your styled-components from your Dashboard above)

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textPrimary};
`;

const Sidebar = styled.div`
  width: 240px;
  background: ${({ theme }) => theme.navbarCards};
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
`;

// Add sidebar links with react-router-dom Links or just onClick to navigate
const SidebarLink = styled.div`
  margin: 16px 0;
  padding: 10px;
  border-radius: 6px;
  font-weight: 500;
  color: ${({ theme }) => theme.textPrimary};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${({ theme }) => theme.accent1}20;
    color: ${({ theme }) => theme.accent1};
  }
`;

// Other styled-components: PageTitle, Main, Header, UserInfo, Avatar, SearchBox, etc.
// (Copy from your previous code)

const PageTitle = styled.h1`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.accent2};
  margin-bottom: 24px;
`;

const Main = styled.div`
  flex: 1;
  padding: 32px;
  animation: ${fadeSlideIn} 0.5s ease-in;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 20px;
  background: ${({ theme }) => theme.navbarCards};
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.accent1};
  object-fit: cover;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 6px 10px;
  border-radius: 12px;
  max-width: 280px;
  flex-grow: 1;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.accent1};
    box-shadow: 0 0 8px ${({ theme }) => theme.accent1}55;
  }
`;

const SearchIconWrapper = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  margin-right: 8px;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  flex-grow: 1;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 0.9rem;
  font-weight: 500;

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
    font-weight: 400;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const Card = styled.div`
  background: ${({ theme }) => theme.navbarCards};
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  h3 {
    color: ${({ theme }) => theme.accent1};
    margin-top: 16px;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.92rem;
    margin: 6px 0;
  }

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 30px
      ${({ theme }) =>
        theme.isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 123, 255, 0.25)"};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const Button = styled.button`
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  color: white;
  background-color: ${({ variant }) =>
    variant === "update" ? "#3498db" : "#e74c3c"};
  transition: transform 0.2s ease, filter 0.2s ease;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 40px 0 16px;
`;

const PageBtn = styled.button`
  padding: 10px 14px;
  background: ${({ theme, active }) =>
    active ? theme.accent1 : theme.navbarCards};
  color: ${({ theme, active }) => (active ? "#fff" : theme.textPrimary)};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.accent2};
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const RoleBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  font-weight: 600;
  font-size: 0.85rem;
  color: white;
  border-radius: 12px;
  background-color: ${({ role }) => {
    if (!role) return "#7f8c8d";
    switch (role.toLowerCase()) {
      case "admin":
        return "#e74c3c";
      case "moderator":
        return "#2980b9";
      case "editor":
        return "#27ae60";
      case "user":
        return "#8e44ad";
      default:
        return "#7f8c8d";
    }
  }};
`;

const ChartWrapper = styled.div`
  background: ${({ theme }) => theme.navbarCards};
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
`;

// Main Dashboard component
export default function Dashboard() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Get logged in user info from localStorage
  const user = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("loggedInUser")) || {};
    } catch {
      return {};
    }
  }, []);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  // Fetch paginated users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/users", {
        params: { _page: page, _limit: perPage },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  // Fetch all posts
  const { data: posts = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/posts");
      return res.data;
    },
  });

  // Filter users by search query (name or email)
  const filteredUsers = users.filter((u) =>
    [u.fullname, u.email].some((field) =>
      field?.toLowerCase().includes(search.trim().toLowerCase())
    )
  );

  const handleUpdate = (userId) => {
    navigate(`/edit-user/${userId}`);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:3000/users/${userId}`);
        queryClient.invalidateQueries(["users"]);
        navigate("/dashboard");
      } catch (err) {
        alert("Failed to delete user.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/sign-in");
  };

  // Count posts by category (flatten categories from posts)
  const categoryCounts = posts.reduce((acc, post) => {
    post.category.forEach((cat) => {
      acc[cat] = (acc[cat] || 0) + 1;
    });
    return acc;
  }, {});

  // Prepare chart data for categories
  const chartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Number of Posts",
        data: Object.values(categoryCounts),
        backgroundColor: [
          "#3498db",
          "#e74c3c",
          "#2ecc71",
          "#f1c40f",
          "#9b59b6",
          "#34495e",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Posts Count by Category" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <Container>
      <Sidebar>
        <PageTitle>👑 Dashboard</PageTitle>
        <SidebarLink onClick={() => navigate("/create-posts")}>
          Create Posts
        </SidebarLink>
        <SidebarLink>Comment</SidebarLink>
        <SidebarLink>Likes</SidebarLink>
        <SidebarLink
          onClick={handleLogout}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <FiLogOut /> Logout
        </SidebarLink>
      </Sidebar>

      <Main>
        <Header>
          <UserInfo>
            <Avatar
              src={user.profilePicture || "https://via.placeholder.com/64"}
              alt="User Avatar"
            />
            <div>
              <h2 style={{ fontSize: "1.15rem", margin: 0 }}>
                Hello, {user.fullname || "User"}
              </h2>
              <small
                style={{ fontSize: "0.85rem", color: theme.textSecondary }}
              >
                {user.email || "No email"}
              </small>
              <div
                style={{
                  marginTop: "6px",
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                {(Array.isArray(user.role) ? user.role : [user.role])
                  .filter(Boolean)
                  .map((r) => (
                    <RoleBadge key={r} role={r}>
                      {r}
                    </RoleBadge>
                  ))}
              </div>
            </div>
          </UserInfo>

          <SearchBox>
            <SearchIconWrapper>
              <FiSearch />
            </SearchIconWrapper>
            <SearchInput
              placeholder="Search users by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search users"
            />
          </SearchBox>
        </Header>

        {isLoading ? (
          <p>Loading users...</p>
        ) : (
          <>
            <ChartWrapper>
              <Bar data={chartData} options={chartOptions} />
            </ChartWrapper>

            <CardsGrid>
              {filteredUsers.length === 0 && <p>No users found.</p>}
              {filteredUsers.map((u) => (
                <Card key={u.id}>
                  <Avatar
                    src={u.profilePicture || "https://via.placeholder.com/64"}
                    alt={`${u.fullname} Avatar`}
                  />
                  <h3>{u.fullname || "No name"}</h3>
                  <p>{u.email || "No email"}</p>
                  <p>Phone: {u.phone || "N/A"}</p>
                  <p>
                    Posts: {posts.filter((p) => p.createdBy === u.id).length}
                  </p>
                  <ButtonGroup>
                    <Button
                      variant="update"
                      onClick={() => handleUpdate(u.id)}
                      title="Update user"
                    >
                      Update
                    </Button>
                    <Button variant="delete" onClick={() => handleDelete(u.id)}>
                      Delete
                    </Button>
                  </ButtonGroup>
                </Card>
              ))}
            </CardsGrid>
          </>
        )}
      </Main>
    </Container>
  );
}
