import React, { useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  RadarController,
  PolarAreaController,
  DoughnutController,
  PointElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar, Line, Pie, Doughnut, Radar, PolarArea } from "react-chartjs-2";
import DashboardLayout from "./DashboardLayout";
import { useAuth } from "../../Contexts/AuthContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  RadarController,
  PolarAreaController,
  DoughnutController,
  PointElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Title
);

// Styled Components

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textPrimary};
  /* Let container grow with content */
  min-height: 100vh;

  @media (max-width: 600px) {
    padding: 1rem;
    grid-template-columns: 1fr; /* Single column on mobile */
  }
`;

const ChartCard = styled.div`
  background-color: ${({ theme }) => theme.navbarCards};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
`;

const ChartTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.textPrimary};
`;

const ChartWrapper = styled.div`
  flex-grow: 1;
  height: 320px; /* Desktop fixed height */

  @media (max-width: 768px) {
    height: 250px; /* Smaller height for tablets */
  }

  @media (max-width: 480px) {
    height: 200px; /* Even smaller for mobile */
  }
`;

const fetchData = async (endpoint) => {
  const res = await axios.get(`http://localhost:3000/${endpoint}`);
  return res.data;
};

const Dashboard = () => {
  const { loggedInUser } = useAuth();

  const { data: posts = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchData("posts"),
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchData("users"),
  });

  const { data: comments = [] } = useQuery({
    queryKey: ["comments"],
    queryFn: () => fetchData("comments"),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchData("categories"),
  });

  // Calculations
  const postsPerCategory = useMemo(() => {
    return categories.map((cat) => ({
      name: cat.name,
      count: posts.filter((p) => p.category === cat.name).length,
    }));
  }, [categories, posts]);

  const postsOverTime = useMemo(() => {
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    const grouped = {};
    sortedPosts.forEach((post) => {
      const date = new Date(post.createdAt).toLocaleDateString();
      grouped[date] = (grouped[date] || 0) + 1;
    });

    return {
      dates: Object.keys(grouped),
      counts: Object.values(grouped),
    };
  }, [posts]);

  const commentsPerPost = useMemo(() => {
    return posts.map((post) => ({
      title: post.title,
      count: comments.filter((c) => c.postId === post.id).length,
    }));
  }, [posts, comments]);

  const statusCounts = useMemo(() => {
    return posts.reduce((acc, post) => {
      const status = post.status || "unknown";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
  }, [posts]);

  // Chart Datasets
  const barData = {
    labels: postsPerCategory.map((c) => c.name),
    datasets: [
      {
        label: "Posts",
        data: postsPerCategory.map((c) => c.count),
        backgroundColor: "#4f46e5",
      },
    ],
  };

  const lineData = {
    labels: postsOverTime.dates,
    datasets: [
      {
        label: "Total Posts Over Time",
        data: postsOverTime.counts,
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "#3b82f6",
        tension: 0.4,
      },
    ],
  };

  const pieData = {
    labels: commentsPerPost.map((p) => p.title),
    datasets: [
      {
        data: commentsPerPost.map((p) => p.count),
        backgroundColor: [
          "#f87171",
          "#fb923c",
          "#facc15",
          "#34d399",
          "#60a5fa",
          "#a78bfa",
        ],
        hoverOffset: 10,
      },
    ],
  };

  const doughnutData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#fbbf24", "#10b981", "#6366f1", "#ec4899"],
        borderWidth: 2,
      },
    ],
  };

  const radarData = {
    labels: categories.map((c) => c.name),
    datasets: [
      {
        label: "Avg Post Length",
        data: categories.map((cat) => {
          const lengths = posts
            .filter((p) => p.category === cat.name)
            .map((p) => p.content?.length || 0);
          const avg =
            lengths.length > 0
              ? lengths.reduce((a, b) => a + b, 0) / lengths.length
              : 0;
          return avg;
        }),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };

  const polarData = {
    labels: users.map((u) => u.fullname),
    datasets: [
      {
        label: "Comments",
        data: users.map(
          (u) => comments.filter((c) => c.userId === u.id).length
        ),
        backgroundColor: [
          "#f472b6",
          "#5eead4",
          "#fdba74",
          "#93c5fd",
          "#a3e635",
        ],
      },
    ],
  };

  return (
    <DashboardLayout>
      <Container>
        <ChartCard>
          <ChartTitle>Posts per Category</ChartTitle>
          <ChartWrapper>
            <Bar
              data={barData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </ChartWrapper>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Total Posts Over Time</ChartTitle>
          <ChartWrapper>
            <Line
              data={lineData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </ChartWrapper>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Comments per Post</ChartTitle>
          <ChartWrapper>
            <Pie
              data={pieData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </ChartWrapper>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Posts by Status</ChartTitle>
          <ChartWrapper>
            <Doughnut
              data={doughnutData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </ChartWrapper>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Avg Post Length per Category</ChartTitle>
          <ChartWrapper>
            <Radar
              data={radarData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </ChartWrapper>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Comments per User</ChartTitle>
          <ChartWrapper>
            <PolarArea
              data={polarData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </ChartWrapper>
        </ChartCard>
      </Container>
    </DashboardLayout>
  );
};

export default Dashboard;
