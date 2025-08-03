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

// 🔷 Styled Components
const Container = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
  padding: 2rem;
`;

const ChartCard = styled.div`
  background-color: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: ${({ theme }) => theme.shadow || "0 0 8px rgba(0, 0, 0, 0.08)"};
  transition: all 0.3s ease;
`;

const ChartTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.text};
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

  const postsPerCategory = useMemo(() => {
    return categories.map((cat) => ({
      name: cat.name,
      count: posts.filter((p) => p.category === cat.name).length,
    }));
  }, [categories, posts]);

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

  const postsOverTime = useMemo(() => {
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    const grouped = {};
    sortedPosts.forEach((post) => {
      const date = new Date(post.createdAt).toLocaleDateString();
      grouped[date] = (grouped[date] || 0) + 1;
    });

    const dates = Object.keys(grouped);
    const counts = Object.values(grouped);

    return { dates, counts };
  }, [posts]);

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

  const commentsPerPost = useMemo(() => {
    return posts.map((post) => ({
      title: post.title,
      count: comments.filter((c) => c.postId === post.id).length,
    }));
  }, [posts, comments]);

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

  const statusCounts = useMemo(() => {
    return posts.reduce((acc, post) => {
      const status = post.status || "unknown";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
  }, [posts]);

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
          const postLengths = posts
            .filter((post) => post.category === cat.name)
            .map((p) => p.content?.length || 0);
          const avg = postLengths.length
            ? postLengths.reduce((a, b) => a + b, 0) / postLengths.length
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
          <Bar data={barData} options={{ responsive: true }} />
        </ChartCard>

        <ChartCard>
          <ChartTitle>Total Posts Over Time</ChartTitle>
          <Line data={lineData} options={{ responsive: true }} />
        </ChartCard>

        <ChartCard>
          <ChartTitle>Comments per Post</ChartTitle>
          <Pie data={pieData} options={{ responsive: true }} />
        </ChartCard>

        <ChartCard>
          <ChartTitle>Posts by Status</ChartTitle>
          <Doughnut data={doughnutData} options={{ responsive: true }} />
        </ChartCard>

        <ChartCard>
          <ChartTitle>Avg Post Length per Category</ChartTitle>
          <Radar data={radarData} options={{ responsive: true }} />
        </ChartCard>

        <ChartCard>
          <ChartTitle>Comments per User</ChartTitle>
          <PolarArea data={polarData} options={{ responsive: true }} />
        </ChartCard>
      </Container>
    </DashboardLayout>
  );
};

export default Dashboard;
